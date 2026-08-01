"use client";

import { useId } from "react";

/**
 * The single field appearance for the whole builder (DESIGN.md > Components >
 * Inputs). min-h-11 keeps every control at the 44px touch-target floor.
 */
export const fieldInputClass =
  "w-full min-h-11 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm";

interface FieldProps {
  label: string;
  required?: boolean;
  /** Span both columns of the form grid. */
  wide?: boolean;
  /** Receives the generated id so the control is always label-associated. */
  children: (id: string) => React.ReactNode;
}

export default function Field({ label, required, wide, children }: FieldProps) {
  const id = useId();

  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && (
          <>
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </>
        )}
      </label>
      {children(id)}
    </div>
  );
}
