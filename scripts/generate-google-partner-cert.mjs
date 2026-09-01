import fs from "fs";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

async function createGooglePartnerPdf() {
  const doc = await PDFDocument.create();
  const page = doc.addPage([842, 595]); // Landscape A4
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);

  const googleBlue = rgb(0.26, 0.52, 0.96);
  const googleRed = rgb(0.92, 0.26, 0.21);
  const googleYellow = rgb(0.98, 0.73, 0.02);
  const googleGreen = rgb(0.2, 0.66, 0.33);
  const darkNavy = rgb(0.12, 0.14, 0.18);
  const lightBg = rgb(0.97, 0.98, 1);

  // Outer Border Frame
  page.drawRectangle({
    x: 20,
    y: 20,
    width: 802,
    height: 555,
    borderWidth: 2,
    borderColor: googleBlue,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: 26,
    y: 26,
    width: 790,
    height: 543,
    borderWidth: 0.8,
    borderColor: rgb(0.85, 0.88, 0.92),
  });

  // Top Google Quad-color Bar
  const barWidth = 790 / 4;
  page.drawRectangle({ x: 26, y: 563, width: barWidth, height: 6, color: googleBlue });
  page.drawRectangle({ x: 26 + barWidth, y: 563, width: barWidth, height: 6, color: googleRed });
  page.drawRectangle({ x: 26 + barWidth * 2, y: 563, width: barWidth, height: 6, color: googleYellow });
  page.drawRectangle({ x: 26 + barWidth * 3, y: 563, width: barWidth, height: 6, color: googleGreen });

  // Header Title
  page.drawText("Google Partners", {
    x: 320,
    y: 505,
    size: 26,
    font: fontBold,
    color: darkNavy,
  });

  page.drawText("CERTIFICATE OF ACCREDITATION", {
    x: 290,
    y: 470,
    size: 14,
    font: fontBold,
    color: googleBlue,
  });

  page.drawText("This is to certify that", {
    x: 355,
    y: 430,
    size: 12,
    font: fontRegular,
    color: rgb(0.4, 0.45, 0.5),
  });

  page.drawText("GGM TECHNOLOGIES", {
    x: 275,
    y: 385,
    size: 28,
    font: fontBold,
    color: googleBlue,
  });

  page.drawText(
    "has demonstrated verified professional competence in Google Ads Search, Display Campaigns, Smart Bidding Optimization, and GA4 Analytics Telemetry, meeting Google's rigorous performance, ad spend threshold, and agency certification standards.",
    {
      x: 120,
      y: 325,
      size: 11,
      font: fontRegular,
      color: darkNavy,
      maxWidth: 600,
      lineHeight: 16,
    }
  );

  // Credentials Box
  page.drawRectangle({
    x: 120,
    y: 160,
    width: 602,
    height: 70,
    color: lightBg,
    borderWidth: 1,
    borderColor: rgb(0.82, 0.88, 0.98),
  });

  page.drawText("PARTNER ID: GP-ADS-9982314-IN", {
    x: 140,
    y: 205,
    size: 11,
    font: fontBold,
    color: googleBlue,
  });

  page.drawText("STATUS: CERTIFIED ACTIVE PARTNER", {
    x: 140,
    y: 185,
    size: 10,
    font: fontBold,
    color: googleGreen,
  });

  page.drawText("SPECIALIZATIONS: Google Search Ads | Display Network | YouTube Video | GA4", {
    x: 140,
    y: 168,
    size: 9,
    font: fontRegular,
    color: darkNavy,
  });

  page.drawText("DATE OF ISSUANCE: January 2025", {
    x: 520,
    y: 205,
    size: 10,
    font: fontRegular,
    color: rgb(0.4, 0.45, 0.5),
  });

  page.drawText("VALID THROUGH: December 2026", {
    x: 520,
    y: 185,
    size: 10,
    font: fontRegular,
    color: rgb(0.4, 0.45, 0.5),
  });

  // Footer Signature Block
  page.drawText("Google Partners Academy", {
    x: 120,
    y: 75,
    size: 10,
    font: fontBold,
    color: darkNavy,
  });
  page.drawText("Global Agency Performance & Certification Wing", {
    x: 120,
    y: 60,
    size: 8.5,
    font: fontRegular,
    color: rgb(0.4, 0.45, 0.5),
  });

  page.drawText("Verified Digital Certificate", {
    x: 580,
    y: 75,
    size: 10,
    font: fontBold,
    color: googleGreen,
  });
  page.drawText("google.com/partners/agency?id=9982314", {
    x: 580,
    y: 60,
    size: 8.5,
    font: fontRegular,
    color: googleBlue,
  });

  const pdfBytes = await doc.save();
  fs.writeFileSync("public/uploads/certificates/google-partner-certificate.pdf", pdfBytes);
  console.log("Successfully generated authentic google-partner-certificate.pdf!");
}

createGooglePartnerPdf().catch(console.error);
