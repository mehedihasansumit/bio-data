"use client";

import dynamic from "next/dynamic";

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
      <div className="bg-emerald-800 px-6 py-3">
        <div className="max-w-7xl mx-auto h-11 flex items-center">
          <span className="text-xl font-bold text-white">Biodata Builder</span>
        </div>
      </div>
      <p className="max-w-7xl mx-auto p-6 text-sm text-gray-600">
        Loading your biodata…
      </p>
    </div>
  ),
});

export default function BuilderLoader() {
  return <BuilderClient />;
}
