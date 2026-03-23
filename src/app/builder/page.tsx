"use client";

import { useState } from "react";
import { BiodataFormData, initialBiodata, sampleBiodata } from "@/types/biodata";
import { TemplateName } from "@/types/templates";
import PersonalInfoForm from "@/components/form/PersonalInfoForm";
import EducationCareerForm from "@/components/form/EducationCareerForm";
import FamilyInfoForm from "@/components/form/FamilyInfoForm";
import AddressForm from "@/components/form/AddressForm";
import ContactForm from "@/components/form/ContactForm";
import AdditionalInfoForm from "@/components/form/AdditionalInfoForm";
import BiodataPreview from "@/components/preview/BiodataPreview";
import TemplateSelector from "@/components/ui/TemplateSelector";

const tabs = [
  "Personal",
  "Education",
  "Family",
  "Address",
  "Contact",
  "Lifestyle & Partner",
] as const;

type Tab = (typeof tabs)[number];

export default function BuilderPage() {
  const [data, setData] = useState<BiodataFormData>(sampleBiodata);
  const [activeTab, setActiveTab] = useState<Tab>("Personal");
  const [showPreview, setShowPreview] = useState(false);
  const [template, setTemplate] = useState<TemplateName>("classic");

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to clear all data?")) {
      setData(initialBiodata);
    }
  };

  const handleLoadSample = () => {
    setData(sampleBiodata);
  };

  const renderForm = () => {
    switch (activeTab) {
      case "Personal":
        return (
          <PersonalInfoForm
            data={data.personal}
            onChange={(personal) => setData({ ...data, personal })}
          />
        );
      case "Education":
        return (
          <EducationCareerForm
            data={data.education}
            onChange={(education) => setData({ ...data, education })}
          />
        );
      case "Family":
        return (
          <FamilyInfoForm
            data={data.family}
            onChange={(family) => setData({ ...data, family })}
          />
        );
      case "Address":
        return (
          <AddressForm
            data={data.address}
            onChange={(address) => setData({ ...data, address })}
          />
        );
      case "Contact":
        return (
          <ContactForm
            data={data.contact}
            onChange={(contact) => setData({ ...data, contact })}
          />
        );
      case "Lifestyle & Partner":
        return (
          <AdditionalInfoForm
            lifestyle={data.lifestyle}
            partner={data.partner}
            onLifestyleChange={(lifestyle) => setData({ ...data, lifestyle })}
            onPartnerChange={(partner) => setData({ ...data, partner })}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-emerald-800 text-white py-4 px-6 print:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="text-xl font-bold">
            Biodata Builder
          </a>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLoadSample}
              className="text-sm text-emerald-200 hover:text-white transition-colors"
            >
              Load Sample
            </button>
            <button
              onClick={handleReset}
              className="text-sm text-emerald-200 hover:text-white transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={handlePrint}
              className="bg-white text-emerald-800 px-5 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
            >
              Print / Download PDF
            </button>
          </div>
        </div>
      </header>

      {/* Mobile toggle */}
      <div className="lg:hidden flex print:hidden border-b bg-white">
        <button
          className={`flex-1 py-3 text-center font-medium ${!showPreview ? "text-emerald-700 border-b-2 border-emerald-700" : "text-gray-500"}`}
          onClick={() => setShowPreview(false)}
        >
          Form
        </button>
        <button
          className={`flex-1 py-3 text-center font-medium ${showPreview ? "text-emerald-700 border-b-2 border-emerald-700" : "text-gray-500"}`}
          onClick={() => setShowPreview(true)}
        >
          Preview
        </button>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6 print:max-w-none print:p-0">
        <div className="flex flex-col lg:flex-row gap-6 print:block">
          {/* Form Panel */}
          <div className={`lg:w-1/2 print:hidden ${showPreview ? "hidden lg:block" : ""}`}>
            {/* Tabs */}
            <div className="flex flex-wrap gap-1 mb-4 bg-white rounded-lg p-1 shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-emerald-700 text-white"
                      : "text-gray-600 hover:bg-emerald-50"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Active Form */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {renderForm()}

              {/* Navigation buttons */}
              <div className="flex justify-between mt-4 pt-4 border-t">
                <button
                  onClick={() => {
                    const idx = tabs.indexOf(activeTab);
                    if (idx > 0) setActiveTab(tabs[idx - 1]);
                  }}
                  disabled={activeTab === tabs[0]}
                  className="px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => {
                    const idx = tabs.indexOf(activeTab);
                    if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1]);
                  }}
                  disabled={activeTab === tabs[tabs.length - 1]}
                  className="px-4 py-2 text-sm font-medium text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className={`lg:w-1/2 print:!block print:!w-full ${!showPreview ? "hidden lg:block" : ""}`}>
            <div className="sticky top-4 print:static">
              {/* Template selector */}
              <div className="mb-3 print:hidden">
                <h2 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  Choose Template
                </h2>
                <TemplateSelector selected={template} onChange={setTemplate} />
              </div>

              <div className="shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none bg-white">
                <BiodataPreview data={data} template={template} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
