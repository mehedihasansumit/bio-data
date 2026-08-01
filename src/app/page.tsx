import Link from "next/link";
import PageShell from "@/components/landing/PageShell";
import { LANDING_PAGES } from "@/lib/landingPages";
import { faqSchema, jsonLd, webApplicationSchema } from "@/lib/structuredData";

/**
 * ⚠️ BENGALI COPY — DRAFTED, AWAITING NATIVE-SPEAKER REVIEW.
 * Written by an assistant; register and idiom are the likely problems.
 */
const FEATURES = [
  {
    title: "সব ঘর আগে থেকেই সাজানো",
    body: "কোন তথ্য কোথায় লিখবেন ভাবতে হবে না। পরিবারগুলো যা দেখতে চান, সেই ঘরগুলো ধাপে ধাপে সাজানো আছে।",
  },
  {
    title: "লেখার সঙ্গে সঙ্গেই প্রিভিউ",
    // Not "ডান পাশে" (on the right): on a phone the preview is behind a tab,
    // not beside the form. Copy should not describe one breakpoint's layout.
    body: "টাইপ করার সঙ্গে সঙ্গেই বায়োডাটা তৈরি হতে থাকে। ছাপার আগেই দেখে নিতে পারবেন কেমন দেখাচ্ছে।",
  },
  {
    title: "ছাপার উপযোগী A4 PDF",
    body: "চারটি ডিজাইনের যেকোনো একটি বেছে নিন। এক ক্লিকে ছাপুন, বা PDF করে হোয়াটসঅ্যাপে পাঠিয়ে দিন। তথ্য বেশি হলে পরের পাতায় গড়ায় — কোনো শিরোনাম বা সারি মাঝখানে ভাঙে না।",
  },
];

const STEPS = [
  "ধর্ম ও কার বায়োডাটা তা বেছে নিন — সেই অনুযায়ী প্রয়োজনীয় ঘরগুলোই দেখানো হবে।",
  "তথ্য পূরণ করুন। যেটি নেই সেটি খালি রাখুন — খালি ঘর বায়োডাটায় ছাপা হয় না।",
  "ডিজাইন বেছে নিন এবং ভাষা ঠিক করুন — বাংলা না ইংরেজি।",
  "PDF ডাউনলোড করুন বা সরাসরি ছাপুন।",
];

const HOME_FAQ = [
  {
    q: "এটি কি সত্যিই বিনামূল্যে?",
    a: "হ্যাঁ। কোনো অ্যাকাউন্ট লাগে না, কোনো ফি নেই, ডাউনলোডে কোনো জলছাপও বসে না।",
  },
  {
    q: "আমার তথ্য কি আপনাদের সার্ভারে যায়?",
    a: "না। বায়োডাটা আপনার নিজের ব্রাউজারেই সংরক্ষিত থাকে। আপনি না পাঠালে কোনো তথ্য কোথাও যায় না।",
  },
  {
    q: "বায়োডাটা কি বাংলায় বানানো যায়?",
    a: "যায়। ছাপা বায়োডাটার ভাষা বাংলা বা ইংরেজি — যেকোনোটি বেছে নিতে পারেন, এবং পরেও বদলাতে পারেন।",
  },
  /**
   * The one FAQ that has to admit a cost, not just promise a benefit.
   *
   * Everywhere else this page frames device-local storage as reassurance —
   * "তথ্য আপনার ডিভাইসেই থাকে" is a privacy claim. It is also a durability
   * risk, and this answer is the only place on the site that says so before
   * someone has work to lose. The English label is quoted verbatim because
   * the builder's chrome is English: a Bengali paraphrase would send someone
   * looking for a button that does not exist.
   */
  {
    q: "পরে আবার সম্পাদনা করা যাবে?",
    a: "যাবে। একই ব্রাউজারে ফিরে এলে আপনার লেখা তথ্য সেভ করা থাকবে। তবে তথ্য শুধু আপনার এই ডিভাইসেই থাকে — ব্রাউজারের ডেটা মুছে ফেললে বা ফোন বদলালে হারিয়ে যাবে। বিল্ডারে 'Back up or restore' অংশ থেকে একটি কপি নিয়ে রাখুন; সেই কপি দিয়ে অন্য ডিভাইসেও খোলা যাবে।",
  },
];

export default function Home() {
  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(webApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema("", HOME_FAQ)) }}
      />

      <section className="bg-gradient-to-br from-emerald-50 to-white px-6 py-16 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-snug">
            বিয়ের <span className="text-emerald-700">বায়োডাটা</span> তৈরি করুন
            কয়েক মিনিটে
          </h1>
          <p className="mt-6 text-lg text-gray-700 leading-relaxed">
            তথ্য পূরণ করুন, সঙ্গে সঙ্গে প্রিভিউ দেখুন, আর ছাপার উপযোগী A4
            বায়োডাটা ডাউনলোড করুন — পাত্র বা পাত্রীপক্ষের হাতে দেওয়ার জন্য
            সম্পূর্ণ প্রস্তুত।
          </p>
          <Link
            href="/builder"
            className="mt-8 inline-flex items-center justify-center min-h-12 px-8 py-3.5 text-lg font-semibold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-200"
          >
            বায়োডাটা তৈরি করুন
          </Link>
          <p className="mt-4 text-sm text-gray-600">
            বিনামূল্যে · অ্যাকাউন্ট লাগে না · তথ্য আপনার ডিভাইসেই থাকে
          </p>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {FEATURES.map((feature) => (
            <div key={feature.title}>
              <h2 className="font-semibold text-gray-900">{feature.title}</h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-14 bg-gray-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900">কীভাবে কাজ করে</h2>
          <ol className="mt-5 flex flex-col gap-4">
            {STEPS.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="shrink-0 w-7 h-7 rounded-full bg-emerald-700 text-white text-sm font-semibold flex items-center justify-center"
                >
                  {i + 1}
                </span>
                <span className="text-gray-700 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900">
            কোন ধরনের বায়োডাটা বানাবেন?
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            প্রতিটির জন্য আলাদা নির্দেশনা ও একটি সম্পূর্ণ নমুনা দেওয়া আছে।
          </p>
          <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LANDING_PAGES.map((page) => (
              <li key={page.slug}>
                <Link
                  href={`/${page.slug}`}
                  className="block min-h-11 rounded-lg border border-gray-300 bg-white p-4 hover:border-emerald-600 transition-colors"
                >
                  <span className="block font-semibold text-gray-900">{page.h1}</span>
                  <span className="block mt-1 text-sm text-gray-600">
                    ফরম্যাট, নিয়ম ও নমুনা
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900">সাধারণ প্রশ্ন</h2>
          <dl className="mt-5 flex flex-col gap-5">
            {HOME_FAQ.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-gray-900">{item.q}</dt>
                <dd className="mt-1 text-gray-700 leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </PageShell>
  );
}
