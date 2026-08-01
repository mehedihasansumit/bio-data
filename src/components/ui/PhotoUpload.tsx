"use client";

import { useId, useState } from "react";

interface PhotoUploadProps {
  photo: string;
  onChange: (base64: string) => void;
}

const MAX_BYTES = 5 * 1024 * 1024;

export default function PhotoUpload({ photo, onChange }: PhotoUploadProps) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_BYTES) {
      const mb = (file.size / 1024 / 1024).toFixed(1);
      setError(
        `That photo is ${mb}MB — the limit is 5MB. Try your phone's crop or "resize" option, or pick a smaller photo.`,
      );
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setError("");
      onChange(reader.result as string);
    };
    reader.onerror = () => {
      setError("That file could not be read. Try a different photo.");
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="sm:col-span-2 flex flex-col items-center gap-3">
      {/* Input precedes the label so Tailwind's `peer` can style focus. */}
      <input
        id={inputId}
        type="file"
        accept="image/*"
        className="sr-only peer"
        aria-describedby={error ? errorId : undefined}
        onChange={handleFileChange}
      />
      <label
        htmlFor={inputId}
        className="w-32 h-40 border-2 border-dashed border-emerald-400 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer bg-emerald-50 hover:bg-emerald-100 transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-emerald-700"
      >
        {photo ? (
          <img src={photo} alt="Your uploaded photo" className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm font-medium text-emerald-800 text-center px-2">
            {"Add a photo"}
          </span>
        )}
      </label>

      {error && (
        <p id={errorId} role="alert" className="max-w-xs text-center text-sm text-red-700">
          {error}
        </p>
      )}

      {photo && (
        <button
          type="button"
          onClick={() => {
            setError("");
            onChange("");
          }}
          className="min-h-11 px-3 text-sm font-medium text-red-700 rounded-lg hover:bg-red-50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
        >
          Remove Photo
        </button>
      )}
    </div>
  );
}
