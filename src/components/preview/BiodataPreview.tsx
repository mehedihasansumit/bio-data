"use client";

import { BiodataFormData } from "@/types/biodata";
import { TemplateName } from "@/types/templates";
import ClassicTemplate from "./ClassicTemplate";
import ElegantTemplate from "./ElegantTemplate";
import ModernTemplate from "./ModernTemplate";
import RoyalTemplate from "./RoyalTemplate";

interface Props {
  data: BiodataFormData;
  template: TemplateName;
}

export default function BiodataPreview({ data, template }: Props) {
  switch (template) {
    case "classic":
      return <div id="biodata-preview"><ClassicTemplate data={data} /></div>;
    case "elegant":
      return <div id="biodata-preview"><ElegantTemplate data={data} /></div>;
    case "modern":
      return <div id="biodata-preview"><ModernTemplate data={data} /></div>;
    case "royal":
      return <div id="biodata-preview"><RoyalTemplate data={data} /></div>;
    default:
      return <div id="biodata-preview"><ClassicTemplate data={data} /></div>;
  }
}
