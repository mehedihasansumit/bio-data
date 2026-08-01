import Image from "next/image";
import Link from "next/link";
import { LANDING_PAGES } from "@/lib/landingPages";

/**
 * Header, footer and cross-links shared by the homepage and every guide page.
 *
 * The footer's guide links are the site's only internal linking. With no
 * external backlinks, they are how a crawler reaching any one page discovers
 * the other four — and how ranking signal moves between them.
 */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-emerald-800 text-white py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/icon.svg" alt="" width={28} height={28} aria-hidden="true" />
            <span className="text-xl font-bold">BiyerBiodata</span>
          </Link>
          <Link
            href="/builder"
            className="min-h-11 inline-flex items-center bg-white text-emerald-800 px-5 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
          >
            বায়োডাটা বানান
          </Link>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-gray-50 border-t py-8 px-6 text-sm text-gray-600">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          <nav aria-label="বায়োডাটার ধরন">
            <h2 className="font-semibold text-gray-800 mb-2">বায়োডাটার ধরন</h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {LANDING_PAGES.map((page) => (
                <li key={page.slug}>
                  <Link
                    href={`/${page.slug}`}
                    className="hover:text-emerald-700 transition-colors"
                  >
                    {page.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-gray-200 pt-5">
            <p>BiyerBiodata — বিনামূল্যে বিয়ের বায়োডাটা তৈরি করুন।</p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:mehedihasansumit@gmail.com"
                className="hover:text-emerald-700 transition-colors"
              >
                mehedihasansumit@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/mehedi-hasan-103621210"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-700 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
