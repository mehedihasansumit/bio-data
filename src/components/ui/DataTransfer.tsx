"use client";

import { useId, useRef, useState } from "react";
import { BiodataFormData } from "@/types/biodata";
import { exportFilename, parseBiodata, serializeBiodata } from "@/lib/biodataFile";
import { isBiodataEmpty } from "@/lib/utils";

interface Props {
  data: BiodataFormData;
  onImport: (data: BiodataFormData) => void;
}

type Status = { kind: "ok" | "error"; message: string } | null;

export default function DataTransfer({ data, onImport }: Props) {
  const panelId = useId();
  const textareaId = `${panelId}-paste`;
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [status, setStatus] = useState<Status>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const today = new Date().toISOString().slice(0, 10);

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

  const applyImport = (raw: string) => {
    const result = parseBiodata(raw);
    if (!result.ok) {
      setStatus({ kind: "error", message: result.error });
      return;
    }
    // Importing replaces everything, so guard real work behind a confirm.
    if (!isBiodataEmpty(data) && !confirm("Replace everything currently in the form with this biodata?")) {
      return;
    }
    onImport(result.data);
    setText("");
    setStatus({
      kind: "ok",
      message: result.warning ?? "Biodata loaded.",
    });
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
        onClick={() => setOpen(!open)}
        className="w-full min-h-11 px-4 flex items-center justify-between text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
      >
        Back up or restore
        <span aria-hidden="true" className="text-gray-600">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div id={panelId} className="px-4 pb-4 pt-1 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            Your biodata is saved on this device only. Export a copy to move it to another
            phone or computer, or to keep it somewhere safe.
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-xs"
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
      )}
    </div>
  );
}
