"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

/**
 * Client-only. The builder restores a locally saved draft during its first
 * render, which is only correct if the server never prerenders it — otherwise
 * the static HTML (empty form) and the hydrated tree (restored draft) disagree.
 *
 * This wrapper exists purely so `ssr: false` stays inside a Client Component.
 * Its parent, `app/builder/page.tsx`, has to remain a Server Component in order
 * to export `metadata` at all.
 */
const BuilderClient = dynamic(() => import("./BuilderClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50">
      {/* The header must match BuilderClient's exactly — same mark, same
          height — so hydration fills the page in rather than visibly
          rewriting its own title bar. */}
      <div className="bg-emerald-800 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="flex items-center gap-2 shrink-0 py-2">
            <Image src="/icon.svg" alt="" width={28} height={28} aria-hidden="true" />
            <span className="text-xl font-bold text-white">BiyerBiodata</span>
          </span>
        </div>
      </div>
      <p role="status" className="max-w-7xl mx-auto p-6 text-sm text-gray-600">
        আপনার বায়োডাটা লোড হচ্ছে…
      </p>
    </div>
  ),
});

export default function BuilderLoader() {
  return <BuilderClient />;
}
