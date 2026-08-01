import { ImageResponse } from "next/og";

export const alt = "BiyerBiodata — Marriage Biodata Maker";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Latin-only by design. Satori needs font binaries handed to it explicitly, and
 * Bengali would mean shipping the Hind Siliguri file into the image pipeline for
 * copy that is still English everywhere else. Worth doing once Bengali content
 * lands — a share card in the reader's own script is the whole point.
 */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#065f46",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6ee7b7",
            }}
          >
            Marriage Biodata Maker
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#ffffff",
            }}
          >
            BiyerBiodata
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 34,
              lineHeight: 1.4,
              color: "#a7f3d0",
              maxWidth: 780,
            }}
          >
            Fill in your details, preview live, and download a print-ready
            biodata to share with prospective families.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            borderTop: "2px solid #047857",
            paddingTop: 28,
            fontSize: 24,
            color: "#6ee7b7",
          }}
        >
          Free · Four templates · A4 PDF
        </div>
      </div>
    ),
    size,
  );
}
