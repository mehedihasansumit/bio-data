import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-emerald-800 text-white py-4 px-6">
        <div className="max-w-5xl mx-auto flex items-center gap-2">
          <Image src="/icon.svg" alt="BiyerBiodata logo" width={28} height={28} />
          <h2 className="text-xl font-bold">BiyerBiodata</h2>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-white px-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Create Your Marriage{" "}
            <span className="text-emerald-700">Biodata</span> in Minutes
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto">
            Fill in your details, see a live preview, and download a
            beautifully formatted biodata ready to share with prospective
            families.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/builder"
              className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-200"
            >
              Create Your Biodata
            </Link>
          </div>

          {/* Features */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Easy to Fill
              </h3>
              <p className="text-sm text-gray-500">
                Step-by-step form with all the fields families expect to see.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Live Preview
              </h3>
              <p className="text-sm text-gray-500">
                See your biodata update in real-time as you type.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Print & Download
              </h3>
              <p className="text-sm text-gray-500">
                One click to print or save as PDF. Clean A4 format.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-6 px-6 text-sm text-gray-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>BiyerBiodata — Create beautiful marriage biodata effortlessly.</p>
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
      </footer>
    </div>
  );
}
