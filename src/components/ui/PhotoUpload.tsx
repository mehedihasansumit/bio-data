"use client";

import { useRef } from "react";

interface PhotoUploadProps {
  photo: string;
  onChange: (base64: string) => void;
}

export default function PhotoUpload({ photo, onChange }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Photo must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="sm:col-span-2 flex flex-col items-center gap-3">
      <div
        className="w-32 h-40 border-2 border-dashed border-emerald-300 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer bg-emerald-50 hover:bg-emerald-100 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        {photo ? (
          <img
            src={photo}
            alt="Photo preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm text-emerald-500 text-center px-2">
            Click to upload photo
          </span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      {photo && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="text-sm text-red-500 hover:text-red-700"
        >
          Remove Photo
        </button>
      )}
    </div>
  );
}
