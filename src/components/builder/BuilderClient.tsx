"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiodataFormData, initialBiodata, sampleBiodata } from "@/types/biodata";
import { TemplateName } from "@/types/templates";
import PersonalInfoForm from "@/components/form/PersonalInfoForm";
import ReligiousInfoForm from "@/components/form/ReligiousInfoForm";
import EducationCareerForm from "@/components/form/EducationCareerForm";
import FamilyInfoForm from "@/components/form/FamilyInfoForm";
import AddressForm from "@/components/form/AddressForm";
import ContactForm from "@/components/form/ContactForm";
import AdditionalInfoForm from "@/components/form/AdditionalInfoForm";
import BiodataPreview from "@/components/preview/BiodataPreview";
import TemplateSelector from "@/components/ui/TemplateSelector";
import DocumentSettings from "@/components/ui/DocumentSettings";
import DataTransfer from "@/components/ui/DataTransfer";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { isBiodataEmpty } from "@/lib/utils";

const tabs = [
  "Personal",
  "Education",
  "Family",
  "Address",
  "Contact",
  "Lifestyle & Partner",
] as const;

type Tab = (typeof tabs)[number];

const slug = (tab: Tab) => tab.toLowerCase().replace(/[^a-z]+/g, "-");

const STORAGE_KEY = "biyerbiodata:draft:v1";

/**
 * The photo lives under its own key, apart from the rest of the draft.
 *
 * Everything else a biodata holds is text and serializes to tens of kilobytes;
 * a photo is base64 and runs to several megabytes. Kept in one blob, every
 * 600ms autosave — so every pause in typing — meant `JSON.stringify` over that
 * megabyte string and a synchronous write of the result, on a low-end Android
 * phone, which is the device this product is mostly used on. Split out, the
 * per-keystroke write is the text alone and the photo is written only when the
 * photo itself changes.
 */
const PHOTO_KEY = "biyerbiodata:draft:photo:v1";

interface SavedDraft {
  data: BiodataFormData;
  template: TemplateName;
  activeTab: Tab;
}

/**
 * Read the saved draft and put the photo back on it. Safe to call during
 * render because this component is only ever mounted on the client (see
 * builder/page.tsx, `ssr: false`), which is also what keeps the restored draft
 * from causing a hydration mismatch.
 */
function readDraft(): Partial<SavedDraft> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw) as Partial<SavedDraft>;
    const photo = window.localStorage.getItem(PHOTO_KEY);
    if (photo && draft.data?.personal) draft.data.personal.photo = photo;
    return draft;
  } catch {
    // A corrupt or unreadable draft must never block the builder.
    return null;
  }
}

export default function BuilderClient() {
  const [draft] = useState(readDraft);

  const [data, setData] = useState<BiodataFormData>(() =>
    draft?.data ? { ...initialBiodata, ...draft.data } : initialBiodata,
  );
  const [template, setTemplate] = useState<TemplateName>(draft?.template ?? "classic");
  const [activeTab, setActiveTab] = useState<Tab>(() =>
    draft?.activeTab && tabs.includes(draft.activeTab) ? draft.activeTab : "Personal",
  );
  const [showPreview, setShowPreview] = useState(false);
  /**
   * Whether the last autosave actually reached storage. `failed` has to be a
   * state of its own rather than the absence of `saved`: the write throws on a
   * full quota, which a photo reliably causes, and the draft already in storage
   * stays behind as a stale copy. Reporting that as "Saved to this device" is
   * the one lie this app could tell that costs someone their work.
   */
  const [saveState, setSaveState] = useState<"idle" | "saved" | "failed">("idle");
  const [confirmingClear, setConfirmingClear] = useState(false);
  const [backupOpen, setBackupOpen] = useState(false);
  /**
   * Whether this session has reached the print dialog.
   *
   * Printing is the one action every person performs, from a header button
   * that needs no scrolling — and it is the last thing they do before closing
   * the tab. The Back up or restore disclosure sits 70px under Next, which
   * reaches anyone walking the form with Previous/Next but misses the person
   * who navigates by the tab strip and never scrolls to the bottom. This is
   * the second touchpoint that catches them, at the moment the stake is
   * highest: a saved PDF feels like a saved biodata, and it is not one.
   */
  const [hasPrinted, setHasPrinted] = useState(false);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const backupRef = useRef<HTMLDivElement>(null);
  /** The photo currently in storage, so autosave can skip rewriting it. */
  const savedPhotoRef = useRef<string | null>(draft?.data?.personal?.photo ?? null);
  const isEmpty = isBiodataEmpty(data);

  /**
   * Write the draft to storage now. Returns whether all of it got there.
   *
   * Extracted from the autosave timer because the page going away has to be
   * able to write too, and it cannot wait 600ms to do it.
   */
  const persistDraft = useCallback(() => {
    const { photo } = data.personal;
    let ok = true;

    // The text half: small, and written on every change.
    try {
      const next: SavedDraft = {
        data: { ...data, personal: { ...data.personal, photo: "" } },
        template,
        activeTab,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      ok = false;
    }

    // The photo half: large, and written only when it actually changed.
    if (ok && photo !== savedPhotoRef.current) {
      try {
        if (photo) window.localStorage.setItem(PHOTO_KEY, photo);
        else window.localStorage.removeItem(PHOTO_KEY);
        savedPhotoRef.current = photo;
      } catch {
        // Quota exceeded — a large photo is what does it. Drop the stale
        // photo rather than leave a draft that would restore with the wrong
        // one, and keep the text, which did fit. `savedPhotoRef` stays out
        // of sync on purpose so the next change retries: quota can free up,
        // and removing the photo has to be able to recover from this.
        try {
          window.localStorage.removeItem(PHOTO_KEY);
        } catch {
          // Nothing left to try; the report below is what matters.
        }
        savedPhotoRef.current = null;
        ok = false;
      }
    }

    return ok;
  }, [data, template, activeTab]);

  // Autosave, debounced so typing doesn't hit storage on every keystroke.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const ok = persistDraft();
      setSaveState(!ok ? "failed" : isBiodataEmpty(data) ? "idle" : "saved");
    }, 600);
    return () => window.clearTimeout(timer);
  }, [persistDraft, data]);

  /**
   * Flush the pending debounce before the page can be taken away.
   *
   * Without this, reloading within 600ms of the last keystroke drops those
   * keystrokes — silently, now that the unload warning below no longer fires
   * for ordinary reloads. `visibilitychange` → hidden is the event that
   * actually fires on mobile, where a backgrounded tab can be discarded and
   * `beforeunload` never runs at all; `pagehide` covers desktop close and
   * navigation. `localStorage` is synchronous, so the write finishes before
   * the page is torn down.
   */
  useEffect(() => {
    const onHide = () => {
      if (document.visibilityState === "hidden") persistDraft();
    };
    const onPageHide = () => persistDraft();
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onPageHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [persistDraft]);

  /**
   * Warn on leaving — but only when leaving actually costs something.
   *
   * The browser's wording ("Changes you made may not be saved") cannot be
   * changed; every engine ignores custom strings and `preventDefault()` is
   * the entire API. So the only thing that can be made right about this
   * dialog is *when* it appears. It used to appear whenever the form had any
   * content, which was false: the draft is autosaved and `readDraft` restores
   * it, so a reload loses nothing and the browser said otherwise every time.
   *
   * It now appears only after a write has actually failed — quota, which a
   * large photo reliably causes. That is the one state where what is on this
   * device is not what is on screen, and closing the tab really does destroy
   * work. Same principle as the Earned Interruption Rule: an interruption
   * that guards nothing teaches people to dismiss the one that guards
   * something.
   */
  useEffect(() => {
    if (saveState !== "failed") return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [saveState]);

  const handlePrint = () => {
    window.print();
    setHasPrinted(true);
  };

  /**
   * Take the person to the backup panel rather than describe where it is.
   *
   * On a phone the preview and the form are two tabs, so the panel is not
   * merely below the print hint — it is on a surface that is not currently
   * rendered. An instruction ("it's under the form") asks someone to switch
   * tabs and scroll two screens to a control they have never noticed; this
   * does those three steps for them and leaves focus on the trigger, so
   * keyboard and screen-reader users arrive where sighted users are looking.
   */
  const revealBackup = () => {
    setShowPreview(false);
    setBackupOpen(true);
    // After the panel has actually been laid out — scrolling to a collapsed
    // element centres the wrong box.
    requestAnimationFrame(() => {
      const container = backupRef.current;
      if (!container) return;
      container
        .querySelector<HTMLButtonElement>("[data-backup-trigger]")
        ?.focus({ preventScroll: true });
      container.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "center",
      });
    });
  };

  const clearEverything = () => {
    setData(initialBiodata);
    setActiveTab("Personal");
    setShowPreview(false);
    setSaveState("idle");
    setConfirmingClear(false);
    // The next biodata has not been printed, and nothing is open on it.
    setHasPrinted(false);
    setBackupOpen(false);
    savedPhotoRef.current = null;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(PHOTO_KEY);
    } catch {
      // The in-memory reset already happened; nothing to recover.
    }
  };

  const handleReset = () => {
    // Confirmation protects work. With an empty form there is none to protect,
    // so don't make the user answer a question about nothing.
    if (isEmpty) clearEverything();
    else setConfirmingClear(true);
  };

  const handleImport = (imported: BiodataFormData) => {
    setData(imported);
    setActiveTab("Personal");
  };

  const handleLoadSample = () => {
    setData(sampleBiodata);
    setActiveTab("Personal");
  };

  // Arrow-key navigation across the tab strip, per the ARIA tabs pattern.
  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const lastIndex = tabs.length - 1;
      let next: number | null = null;
      if (e.key === "ArrowRight") next = index === lastIndex ? 0 : index + 1;
      else if (e.key === "ArrowLeft") next = index === 0 ? lastIndex : index - 1;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = lastIndex;
      if (next === null) return;
      e.preventDefault();
      setActiveTab(tabs[next]);
      tabRefs.current[next]?.focus();
    },
    [],
  );

  const renderForm = () => {
    switch (activeTab) {
      case "Personal":
        return (
          <>
            <PersonalInfoForm
              data={data.personal}
              onChange={(personal) => setData({ ...data, personal })}
            />
            {/* Renders nothing until a religion is chosen. */}
            <ReligiousInfoForm
              religion={data.personal.religion}
              data={data.religious}
              onChange={(religious) => setData({ ...data, religious })}
            />
          </>
        );
      case "Education":
        return (
          <EducationCareerForm
            data={data.education}
            onChange={(education) => setData({ ...data, education })}
          />
        );
      case "Family":
        return (
          <FamilyInfoForm
            data={data.family}
            onChange={(family) => setData({ ...data, family })}
          />
        );
      case "Address":
        return (
          <AddressForm
            data={data.address}
            onChange={(address) => setData({ ...data, address })}
          />
        );
      case "Contact":
        return (
          <ContactForm
            data={data.contact}
            onChange={(contact) => setData({ ...data, contact })}
          />
        );
      case "Lifestyle & Partner":
        return (
          <AdditionalInfoForm
            lifestyle={data.lifestyle}
            partner={data.partner}
            onLifestyleChange={(lifestyle) => setData({ ...data, lifestyle })}
            onPartnerChange={(partner) => setData({ ...data, partner })}
          />
        );
    }
  };

  return (
    /* The builder's own chrome is English while the rest of the site is
       Bengali, so it has to say so: the document `lang` is `bn`, and without
       this every label here is handed to a screen reader as Bengali text and
       pronounced with Bengali phonetics.

       This is the honest description of what is here today, not the intended
       end state — the tool of a Bengali-first product should be Bengali. That
       is Interface Language, which docs/adr/0001 already separates from
       Document Language; when it lands this attribute becomes dynamic rather
       than disappearing. Note `#biodata-preview` sets its own `lang` from the
       Document Language, so the sheet is unaffected either way. */
    <div lang="en" className="min-h-screen bg-gray-50 print:bg-white">
      {/* Header */}
      <header className="bg-emerald-800 text-white px-6 py-3 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          {/* Must stay identical to the skeleton in BuilderLoader, and to the
              PageShell header, so the mark never changes between surfaces or
              shifts when the app hydrates. */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 py-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Image src="/icon.svg" alt="" width={28} height={28} aria-hidden="true" />
            <span className="text-xl font-bold">BiyerBiodata</span>
          </Link>
          {/* The outer row already wrapped; this group did not, so its three
              nowrap buttons (398px together) ran straight off a 375px viewport
              and "Print / Download PDF" was unreachable on every phone. It wraps
              now, and `ml-auto` keeps Print pinned to the right edge whether the
              group shares the wordmark's row or sits on its own. */}
          <div className="flex flex-wrap items-center justify-end ml-auto gap-1 sm:gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="min-h-11 px-3 text-sm whitespace-nowrap text-emerald-100 rounded-lg hover:bg-emerald-700 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Load Sample
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="min-h-11 px-3 text-sm whitespace-nowrap text-emerald-100 rounded-lg hover:bg-emerald-700 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="min-h-11 bg-white text-emerald-800 px-4 sm:px-5 rounded-lg font-semibold whitespace-nowrap hover:bg-emerald-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {/* Two labels, one control. The full label is 204px wide — with
                  Load Sample and Clear All ahead of it that is 398px, which no
                  phone can give. "Print / PDF" is 105px and still names both
                  outcomes, which is the part that matters: on a phone this
                  button is how a biodata gets saved at all. Only the displayed
                  span is in the accessibility tree, so each width announces one
                  name. */}
              <span className="sm:hidden">Print / PDF</span>
              <span className="hidden sm:inline">Print / Download PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Form / Preview toggle */}
      <div className="lg:hidden flex print:hidden border-b border-gray-200 bg-white">
        <button
          type="button"
          aria-pressed={!showPreview}
          className={`flex-1 min-h-12 py-3 text-center font-medium transition-colors ${
            !showPreview
              ? "text-emerald-700 border-b-2 border-emerald-700"
              : "text-gray-600 border-b-2 border-transparent"
          }`}
          onClick={() => setShowPreview(false)}
        >
          Form
        </button>
        <button
          type="button"
          aria-pressed={showPreview}
          className={`flex-1 min-h-12 py-3 text-center font-medium transition-colors ${
            showPreview
              ? "text-emerald-700 border-b-2 border-emerald-700"
              : "text-gray-600 border-b-2 border-transparent"
          }`}
          onClick={() => setShowPreview(true)}
        >
          Preview
        </button>
      </div>

      <main className="max-w-7xl mx-auto p-4 lg:p-6 print:max-w-none print:p-0">
        <h1 className="sr-only">Build your marriage biodata</h1>
        <div className="flex flex-col lg:flex-row gap-6 print:block">
          {/* Form panel */}
          <div className={`lg:w-1/2 print:hidden ${showPreview ? "hidden lg:block" : ""}`}>
            {/* Section tabs */}
            <div
              role="tablist"
              aria-label="Biodata sections"
              className="flex flex-wrap gap-1 mb-4 bg-white rounded-lg p-1 shadow-sm"
            >
              {tabs.map((tab, i) => {
                const selected = activeTab === tab;
                return (
                  <button
                    key={tab}
                    id={`tab-${slug(tab)}`}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    // Only the selected tab points at a panel: this is a
                    // single-panel tablist, so the other five ids do not exist
                    // in the document and `aria-controls` would dangle.
                    aria-controls={selected ? `panel-${slug(tab)}` : undefined}
                    tabIndex={selected ? 0 : -1}
                    onKeyDown={(e) => handleTabKeyDown(e, i)}
                    onClick={() => setActiveTab(tab)}
                    className={`min-h-11 px-3 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                      selected
                        ? "bg-emerald-700 text-white"
                        : "text-gray-600 hover:bg-emerald-50"
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Active section */}
            <div
              id={`panel-${slug(activeTab)}`}
              role="tabpanel"
              aria-labelledby={`tab-${slug(activeTab)}`}
              tabIndex={-1}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              {renderForm()}

              {/* Sequential navigation */}
              <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    const idx = tabs.indexOf(activeTab);
                    if (idx > 0) setActiveTab(tabs[idx - 1]);
                  }}
                  disabled={activeTab === tabs[0]}
                  className="min-h-11 px-4 text-sm font-medium text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  Previous
                </button>
                {/* "Saved", not "Saved to this device". This is a live region
                    that re-announces every time typing pauses, so it reports
                    the event and nothing more. The caveat — that this device is
                    the *only* copy — is a standing fact, not an event, and
                    lives under the Back up or restore trigger where it can be
                    read once instead of announced forever. The old wording also
                    oversold: it read as "your work is safe", which is the one
                    reason someone would never go looking for a backup. */}
                <p aria-live="polite" className="text-xs text-gray-600">
                  {saveState === "saved" ? "Saved" : ""}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const idx = tabs.indexOf(activeTab);
                    if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1]);
                  }}
                  disabled={activeTab === tabs[tabs.length - 1]}
                  className="min-h-11 px-4 text-sm font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  Next
                </button>
              </div>

              {/* Its own line rather than the status slot above: this needs to
                  name the problem and the way out, which does not fit between
                  two buttons, and it must not be mistaken for the quiet
                  "Saved" it replaces. Inline and never a dialog — the modal is
                  reserved for destructive confirmation. */}
              {saveState === "failed" && (
                <p role="alert" className="mt-3 text-sm text-red-700">
                  Your latest changes couldn&apos;t be saved on this device — its
                  storage is full, usually because of a large photo. Use{" "}
                  <strong className="font-semibold">Back up or restore</strong> below to
                  keep a copy before you close this page.
                </p>
              )}
            </div>

            <div ref={backupRef}>
              <DataTransfer
                data={data}
                onImport={handleImport}
                open={backupOpen}
                onOpenChange={setBackupOpen}
              />
            </div>
          </div>

          {/* Preview panel */}
          <div className={`lg:w-1/2 print:!block print:!w-full ${!showPreview ? "hidden lg:block" : ""}`}>
            <div className="sticky top-4 print:static">
              {/* Everything that describes the document rather than the person
                  lives together: which template, whose biodata, what language.

                  One <section> with one h2 over three h3s, because that is what
                  this already is — the three questions about the artifact,
                  asked in one place. Previously DocumentSettings' two h3s came
                  before "Choose Template"'s h2 in DOM order, so the outline
                  went h1 → h3 → h3 → h2. The h2 is visually hidden: the cluster
                  reads as one group on screen without needing a label, but the
                  outline still has to say where it begins. */}
              <section aria-labelledby="document-settings" className="mb-3 print:hidden flex flex-col gap-3">
                <h2 id="document-settings" className="sr-only">
                  Document settings
                </h2>
                <DocumentSettings
                  meta={data.meta}
                  onChange={(meta) => setData({ ...data, meta })}
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Choose Template
                  </h3>
                  <TemplateSelector selected={template} onChange={setTemplate} />
                </div>
              </section>

              {isEmpty ? (
                <div className="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center print:hidden">
                  <p className="text-base font-semibold text-gray-800">
                    Your biodata will appear here
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Start filling in the form and this sheet updates as you type.
                  </p>
                  <button
                    type="button"
                    onClick={handleLoadSample}
                    className="mt-5 min-h-11 px-4 text-sm font-medium text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                  >
                    Fill with an example
                  </button>
                </div>
              ) : (
                <>
                  <div className="sheet-fit overflow-x-auto shadow-lg rounded-lg print:overflow-visible print:shadow-none print:rounded-none bg-white">
                    <BiodataPreview data={data} template={template} />
                  </div>
                  {/* One slot, two jobs, in the order they come up. Before
                      printing the question is "how do I get a file out of
                      this"; after printing it is "I have a file, am I done?"
                      — and the honest answer is no. A PDF is a picture of the
                      biodata; the editable copy is still only in this
                      browser, and this is the last screen before the tab
                      closes. Replacing rather than stacking, because the
                      Save-as-PDF hint has been read by the time it matters. */}
                  {hasPrinted ? (
                    <div className="mt-2 print:hidden">
                      <p className="text-xs text-gray-600">
                        That saves a PDF — a picture of the biodata. The copy you can
                        still edit is only in this browser.
                      </p>
                      <button
                        type="button"
                        onClick={revealBackup}
                        className="mt-2 min-h-11 px-4 text-sm font-medium text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                      >
                        Back up this biodata
                      </button>
                    </div>
                  ) : (
                    <p className="mt-2 text-xs text-gray-600 print:hidden">
                      Printing? Choose <strong className="font-semibold">Save as PDF</strong>{" "}
                      as the destination to download instead.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <ConfirmDialog
        open={confirmingClear}
        title="Clear this biodata?"
        description="Every field you've filled in, and the copy saved on this device, will be erased. There's no undo — back it up first if you might want it again."
        confirmLabel="Clear everything"
        cancelLabel="Keep editing"
        tone="danger"
        onConfirm={clearEverything}
        onCancel={() => setConfirmingClear(false)}
      />
    </div>
  );
}
