"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
import DataTransfer from "@/components/ui/DataTransfer";
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

interface SavedDraft {
  data: BiodataFormData;
  template: TemplateName;
  activeTab: Tab;
}

/**
 * Read the saved draft. Safe to call during render because this component is
 * only ever mounted on the client (see builder/page.tsx, `ssr: false`), which
 * is also what keeps the restored draft from causing a hydration mismatch.
 */
function readDraft(): Partial<SavedDraft> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Partial<SavedDraft>) : null;
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
  const [savedAt, setSavedAt] = useState(false);

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isEmpty = isBiodataEmpty(data);

  // Autosave, debounced so typing doesn't hit storage on every keystroke.
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const next: SavedDraft = { data, template, activeTab };
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setSavedAt(!isBiodataEmpty(data));
      } catch {
        // Quota exceeded (a large photo will do it). Leave the form working.
      }
    }, 600);
    return () => window.clearTimeout(timer);
  }, [data, template, activeTab]);

  // Warn before losing work to a reload or an outbound link.
  useEffect(() => {
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isBiodataEmpty(data)) e.preventDefault();
    };
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [data]);

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm("Clear every field and start a blank biodata? This cannot be undone.")) {
      setData(initialBiodata);
      setActiveTab("Personal");
      setShowPreview(false);
      setSavedAt(false);
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        // The in-memory reset already happened; nothing to recover.
      }
    }
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
    <div className="min-h-screen bg-gray-50 print:bg-white">
      {/* Header */}
      <header className="bg-emerald-800 text-white px-6 py-3 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <Link
            href="/"
            className="text-xl font-bold shrink-0 py-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Biodata Builder
          </Link>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="min-h-11 px-3 text-sm text-emerald-100 rounded-lg hover:bg-emerald-700 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Load Sample
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="min-h-11 px-3 text-sm text-emerald-100 rounded-lg hover:bg-emerald-700 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="min-h-11 bg-white text-emerald-800 px-5 rounded-lg font-semibold hover:bg-emerald-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Print / Download PDF
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
                    aria-controls={`panel-${slug(tab)}`}
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
                <p aria-live="polite" className="text-xs text-gray-600">
                  {savedAt ? "Saved to this device" : ""}
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
            </div>

            <DataTransfer data={data} onImport={handleImport} />
          </div>

          {/* Preview panel */}
          <div className={`lg:w-1/2 print:!block print:!w-full ${!showPreview ? "hidden lg:block" : ""}`}>
            <div className="sticky top-4 print:static">
              <div className="mb-3 print:hidden">
                <h2 className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                  Choose Template
                </h2>
                <TemplateSelector selected={template} onChange={setTemplate} />
              </div>

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
                  <div className="overflow-x-auto shadow-lg rounded-lg print:overflow-visible print:shadow-none print:rounded-none bg-white">
                    <BiodataPreview data={data} template={template} />
                  </div>
                  <p className="mt-2 text-xs text-gray-600 print:hidden">
                    Printing? Choose <strong className="font-semibold">Save as PDF</strong> as
                    the destination to download instead.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
