"use client";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

/**
 * `h2`, because this is the first heading inside the form panel and the page's
 * only `h1` is the visually-hidden one on the builder itself. As an `h3` it
 * skipped a level, and skipped levels are how heading navigation stops being
 * navigation.
 */
export default function FormSection({ title, children }: FormSectionProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-emerald-800 border-b-2 border-emerald-200 pb-2 mb-4">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}
