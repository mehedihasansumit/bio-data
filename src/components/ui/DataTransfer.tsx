"use client";

import { useId, useRef, useState } from "react";
import { BiodataFormData } from "@/types/biodata";
import { exportFilename, parseBiodata, serializeBiodata } from "@/lib/biodataFile";
import { isBiodataEmpty } from "@/lib/utils";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { fieldInputClass } from "@/components/ui/Field";

interface Props {
  data: BiodataFormData;
  onImport: (data: BiodataFormData) => void;
  /**
   * The disclosure is controlled rather than self-managed because something
   * outside it now needs to open it: after printing, the builder offers a way
   * straight here, and "take me there" that lands on a closed panel has not
   * taken anyone anywhere.
   */
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Status = { kind: "ok" | "error"; message: string } | null;

/** An import held back until the user agrees to overwrite the current form. */
type PendingImport = { data: BiodataFormData; warning?: string };

export default function DataTransfer({ data, onImport, open, onOpenChange }: Props) {
  const panelId = useId();
  const textareaId = `${panelId}-paste`;
  const noticeId = `${panelId}-notice`;
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>(null);
  const [pending, setPending] = useState<PendingImport | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().slice(0, 10);
  /**
   * Whether there is work worth protecting yet. Gates the notice below the
   * trigger: an empty form has nothing to lose, and a warning about losing
   * nothing is how people learn to stop reading warnings.
   */
  const hasWork = !isBiodataEmpty(data);

  const handleCopy = async () => {
    const payload = serializeBiodata(data);
    try {
      await navigator.clipboard.writeText(payload);
      setStatus({ kind: "ok", message: "Copied. Paste it into your password manager to keep it." });
    } catch {
      // Clipboard is unavailable on non-HTTPS origins and when permission is
      // denied. Show the text so it can be copied by hand instead of failing.
      setText(payload);
      setStatus({
        kind: "error",
        message: "Couldn't reach the clipboard. Your biodata is in the box below — select it and copy.",
      });
      window.setTimeout(() => textareaRef.current?.select(), 0);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([serializeBiodata(data)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = exportFilename(data, today);
    a.click();
    URL.revokeObjectURL(url);
    setStatus({ kind: "ok", message: `Saved as ${exportFilename(data, today)}` });
  };

  const commitImport = ({ data: imported, warning }: PendingImport) => {
    onImport(imported);
    setText("");
    setPending(null);
    setStatus({ kind: "ok", message: warning ?? "Biodata loaded." });
  };

  const applyImport = (raw: string) => {
    const result = parseBiodata(raw);
    if (!result.ok) {
      setStatus({ kind: "error", message: result.error });
      return;
    }
    const next: PendingImport = { data: result.data, warning: result.warning };
    // Importing replaces everything, so hold it behind a confirmation whenever
    // there is real work in the form to lose.
    if (isBiodataEmpty(data)) commitImport(next);
    else setPending(next);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => applyImport(String(reader.result ?? ""));
    reader.onerror = () =>
      setStatus({ kind: "error", message: "That file could not be read. Try pasting instead." });
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="mt-4 rounded-lg bg-white shadow-sm print:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-describedby={hasWork ? noticeId : undefined}
        // Named so the builder can find and focus this trigger after jumping
        // here, without reaching in by tag position.
        data-backup-trigger=""
        onClick={() => onOpenChange(!open)}
        className="w-full min-h-11 px-4 flex items-center justify-between text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
      >
        Back up or restore
        <span aria-hidden="true" className="text-gray-600">{open ? "−" : "+"}</span>
      </button>

      {/* Outside the trigger, not inside it. Folded into the button this would
          become part of its accessible name, so the control would announce as
          a paragraph; as a separate `<p>` referenced by `aria-describedby` it
          is announced after the name, which is what a description is for.

          It sits above the panel rather than in it because a disclosure whose
          reason to exist is hidden behind the disclosure explains nothing to
          the only person who needs the explanation. Closed, but not silent. */}
      {hasWork && (
        <p id={noticeId} className="px-4 pb-3 text-xs text-gray-600">
          Saved on this device only. Clear your browser or change phones and it&apos;s
          gone — copy it or download a file to keep it.
        </p>
      )}

      {/* Always in the DOM, hidden with the `hidden` attribute rather than
          unmounted, so the `aria-controls` above always resolves to a real
          element. A disclosure that names a panel which does not exist while
          closed is describing a control that controls nothing. `hidden` is
          `display: none`, so nothing inside is focusable or announced. */}
      <div id={panelId} hidden={!open} className="px-4 pb-4 pt-4 border-t border-gray-200">
          {/* The other half of what backup is for, and the half the notice
              above deliberately does not carry. That line names a risk —
              this device is the only copy. This one names a capability: the
              same two files are how a biodata travels. Naming both buttons is
              the point; the round trip is the part nobody guesses, because
              "Open a file" sits on the device you have not opened yet. */}
          <p className="text-xs text-gray-600">
            Moving to a new phone or computer? Download a file here, then use{" "}
            <strong className="font-semibold">Open a file</strong> there to carry on
            where you left off.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="min-h-11 px-4 text-sm font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Copy biodata
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="min-h-11 px-4 text-sm font-medium text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Download file
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="min-h-11 px-4 text-sm font-medium text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              Open a file
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="sr-only"
              aria-label="Choose a biodata file to restore"
              onChange={handleFile}
            />
          </div>

          <label htmlFor={textareaId} className="block mt-4 text-sm font-medium text-gray-700 mb-1">
            Or paste a saved biodata
          </label>
          <textarea
            id={textareaId}
            ref={textareaRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            spellCheck={false}
            placeholder='{ "format": "biyerbiodata", ... }'
            // The shared field appearance, not a hand-rolled near-copy at a
            // smaller size. The system has exactly one field look.
            className={fieldInputClass}
          />
          <button
            type="button"
            onClick={() => applyImport(text)}
            className="mt-2 min-h-11 px-4 text-sm font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
          >
            Restore from text
          </button>

          {status && (
            <p
              role={status.kind === "error" ? "alert" : "status"}
              className={`mt-3 text-sm ${status.kind === "error" ? "text-red-700" : "text-emerald-800"}`}
            >
              {status.message}
            </p>
          )}
      </div>

      <ConfirmDialog
        open={pending !== null}
        title="Replace what's in the form?"
        description="Restoring this biodata overwrites every field you've filled in so far. The saved copy you're restoring from isn't changed."
        confirmLabel="Replace and restore"
        cancelLabel="Keep what I have"
        tone="primary"
        onConfirm={() => pending && commitImport(pending)}
        onCancel={() => setPending(null)}
      />
    </div>
  );
}
