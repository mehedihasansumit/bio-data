"use client";

import { useEffect, useId, useRef } from "react";

interface Props {
  open: boolean;
  title: string;
  /** One or two sentences naming exactly what is lost and what survives. */
  description: string;
  confirmLabel: string;
  cancelLabel?: string;
  /** `danger` for anything that destroys work; `primary` for a proceed. */
  tone?: "danger" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
}

const confirmTone = {
  danger:
    "bg-red-700 hover:bg-red-800 focus-visible:outline-red-700",
  primary:
    "bg-emerald-700 hover:bg-emerald-800 focus-visible:outline-emerald-700",
} as const;

/**
 * A modal confirmation built on the native `<dialog>` element, which supplies
 * the focus trap, the Escape key, background inertness, and focus restoration
 * that a hand-rolled overlay has to reimplement badly. `open` stays the single
 * source of truth: the native close paths are cancelled and routed back up so
 * React never disagrees with the DOM about whether the dialog is showing.
 */
export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  tone = "danger",
  onConfirm,
  onCancel,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      // `alertdialog` over the implicit `dialog`: this interrupts to demand an
      // answer, and the role makes assistive tech read the stakes on open.
      role="alertdialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      // Escape fires `cancel`; let React drive the close so the exit
      // transition runs from the same place the open transition does.
      onCancel={(e) => {
        e.preventDefault();
        onCancel();
      }}
      // A click on the ::backdrop reports the dialog itself as the target.
      onClick={(e) => {
        if (e.target === dialogRef.current) onCancel();
      }}
      // `m-auto` restores the centering that Preflight's margin reset removes.
      className="confirm-dialog m-auto w-[calc(100%-2rem)] max-w-md max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-lg bg-white p-0 shadow-xl print:hidden"
    >
      <div className="p-6">
        <h2 id={titleId} className="text-lg font-bold text-gray-900">
          {title}
        </h2>
        <p id={descriptionId} className="mt-2 text-sm leading-relaxed text-gray-600">
          {description}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="min-h-11 px-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`min-h-11 px-4 text-sm font-semibold text-white rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${confirmTone[tone]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}
