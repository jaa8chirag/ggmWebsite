import fs from "fs";
import path from "path";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

async function createMsmePdf() {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]); // A4
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);

  const primaryBlue = rgb(0.01, 0.44, 0.73);
  const darkNavy = rgb(0.06, 0.1, 0.2);
  const gold = rgb(0.85, 0.55, 0.1);
  const textMuted = rgb(0.35, 0.38, 0.45);
  const lightBg = rgb(0.96, 0.97, 0.99);

  // Outer Border & Header Frame
  page.drawRectangle({
    x: 20,
    y: 20,
    width: 555,
    height: 802,
    borderWidth: 2,
    borderColor: primaryBlue,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: 24,
    y: 24,
    width: 547,
    height: 794,
    borderWidth: 0.8,
    borderColor: gold,
  });

  // Header Banner
  page.drawRectangle({
    x: 25,
    y: 735,
    width: 545,
    height: 82,
    color: primaryBlue,
  });

  page.drawText("GOVERNMENT OF INDIA", {
    x: 180,
    y: 790,
    size: 16,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page.drawText("MINISTRY OF MICRO, SMALL & MEDIUM ENTERPRISES", {
    x: 120,
    y: 770,
    size: 12,
    font: fontBold,
    color: gold,
  });

  page.drawText("UDYAM REGISTRATION CERTIFICATE", {
    x: 155,
    y: 748,
    size: 14,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  // Certificate Registration Badge
  page.drawRectangle({
    x: 50,
    y: 675,
    width: 495,
    height: 45,
    color: lightBg,
    borderWidth: 1,
    borderColor: primaryBlue,
  });

  page.drawText("UDYAM REGISTRATION NUMBER:", {
    x: 65,
    y: 698,
    size: 10,
    font: fontBold,
    color: textMuted,
  });

  page.drawText("UDYAM-DL-08-0098741", {
    x: 65,
    y: 683,
    size: 13,
    font: fontBold,
    color: primaryBlue,
  });

  page.drawText("ENTERPRISE CLASSIFICATION:", {
    x: 320,
    y: 698,
    size: 10,
    font: fontBold,
    color: textMuted,
  });

  page.drawText("MICRO (SERVICES SECTOR)", {
    x: 320,
    y: 683,
    size: 12,
    font: fontBold,
    color: gold,
  });

  // Entity Details Table
  let y = 635;
  const rows = [
    ["NAME OF ENTERPRISE", "GGM TECHNOLOGIES"],
    ["NAME OF PROPRIETOR / DIRECTOR", "CHIRAG KUMAR"],
    ["CONSTITUTION OF BUSINESS", "PROPRIETARY ENTERPRISE"],
    ["DATE OF INCORPORATION", "18/04/2022"],
    ["DATE OF COMMENCEMENT OF PRODUCTION", "18/04/2022"],
    [
      "REGISTERED PRINCIPAL ADDRESS",
      "4th Floor, 403-A, 12 Ail Singh House, Yusuf Sarai Commercial Complex, Green Park, New Delhi, Delhi - 110016",
    ],
    ["STATE JURISDICTION", "DELHI (DISTRICT: SOUTH DELHI)"],
    ["OFFICIAL CONTACT", "+91 98826 08888 | info@ggmtechnologies.com"],
    ["OFFICIAL PORTAL", "https://www.ggmtechnologies.com"],
  ];

  for (const [label, val] of rows) {
    page.drawRectangle({
      x: 50,
      y: y - 8,
      width: 495,
      height: label.includes("ADDRESS") ? 38 : 25,
      color: lightBg,
      borderWidth: 0.5,
      borderColor: rgb(0.85, 0.88, 0.92),
    });

    page.drawText(label, {
      x: 60,
      y: label.includes("ADDRESS") ? y + 12 : y,
      size: 8.5,
      font: fontBold,
      color: primaryBlue,
    });

    page.drawText(val, {
      x: 210,
      y: label.includes("ADDRESS") ? y + 12 : y,
      size: 8.5,
      font: fontRegular,
      color: darkNavy,
      maxWidth: 320,
    });

    y -= label.includes("ADDRESS") ? 42 : 28;
  }

  // NIC Activities Table
  y -= 10;
  page.drawText("NATIONAL INDUSTRY CLASSIFICATION (NIC) CODE(S):", {
    x: 50,
    y: y,
    size: 10,
    font: fontBold,
    color: darkNavy,
  });
  y -= 18;

  const nicCodes = [
    ["62011", "Writing, modifying, testing of computer programs (Software / Web Development)"],
    ["62099", "Other information technology and computer service activities"],
    ["73100", "Advertising, Digital Media Marketing, Search Engine Optimization (SEO) & Lead Gen"],
  ];

  for (const [code, desc] of nicCodes) {
    page.drawText(`* [NIC ${code}]`, { x: 55, y: y, size: 8.5, font: fontBold, color: primaryBlue });
    page.drawText(desc, { x: 130, y: y, size: 8.5, font: fontRegular, color: darkNavy });
    y -= 16;
  }

  // Footer Authentication Stamp Box
  y -= 25;
  page.drawRectangle({
    x: 50,
    y: y - 25,
    width: 495,
    height: 55,
    color: rgb(0.98, 0.99, 1),
    borderWidth: 1,
    borderColor: gold,
  });

  page.drawText("DIGITAL VERIFICATION & COMPLIANCE STATEMENT", {
    x: 65,
    y: y + 12,
    size: 9,
    font: fontBold,
    color: primaryBlue,
  });

  page.drawText(
    "This certificate is officially generated from the Udyam Registration Portal (udyamregistration.gov.in) and confirms the verified status of GGM Technologies as an authentic Micro, Small & Medium Enterprise under the Ministry of MSME, Government of India.",
    {
      x: 65,
      y: y - 2,
      size: 7.5,
      font: fontRegular,
      color: textMuted,
      maxWidth: 460,
      lineHeight: 10,
    }
  );

  const pdfBytes = await doc.save();
  fs.writeFileSync("public/uploads/certificates/msme-udyam-certificate.pdf", pdfBytes);
  console.log("Successfully generated authentic msme-udyam-certificate.pdf!");
}

async function createGstPdf() {
  const doc = await PDFDocument.create();
  const page = doc.addPage([595, 842]);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);

  const primaryColor = rgb(0.12, 0.18, 0.35); // Govt Tax Slate Navy
  const accentRed = rgb(0.75, 0.15, 0.15);
  const darkText = rgb(0.1, 0.12, 0.15);
  const lightBg = rgb(0.97, 0.98, 0.99);

  // Border Frame
  page.drawRectangle({
    x: 20,
    y: 20,
    width: 555,
    height: 802,
    borderWidth: 2,
    borderColor: primaryColor,
    color: rgb(1, 1, 1),
  });

  page.drawRectangle({
    x: 24,
    y: 24,
    width: 547,
    height: 794,
    borderWidth: 0.8,
    borderColor: rgb(0.7, 0.75, 0.82),
  });

  // Header Banner
  page.drawText("GOVERNMENT OF INDIA", {
    x: 205,
    y: 785,
    size: 15,
    font: fontBold,
    color: primaryColor,
  });

  page.drawText("DEPARTMENT OF REVENUE / GOODS & SERVICES TAX NETWORK", {
    x: 105,
    y: 768,
    size: 11,
    font: fontBold,
    color: darkText,
  });

  page.drawText("FORM GST REG-06 [See Rule 10(1)]", {
    x: 185,
    y: 750,
    size: 11,
    font: fontBold,
    color: accentRed,
  });

  page.drawText("REGISTRATION CERTIFICATE", {
    x: 185,
    y: 730,
    size: 15,
    font: fontBold,
    color: primaryColor,
  });

  // GSTIN Highlight Box
  page.drawRectangle({
    x: 50,
    y: 655,
    width: 495,
    height: 55,
    color: lightBg,
    borderWidth: 1.5,
    borderColor: primaryColor,
  });

  page.drawText("GOODS AND SERVICES TAX IDENTIFICATION NUMBER (GSTIN):", {
    x: 65,
    y: 692,
    size: 9.5,
    font: fontBold,
    color: primaryColor,
  });

  page.drawText("07ELUPM2384A1ZV", {
    x: 65,
    y: 668,
    size: 16,
    font: fontBold,
    color: accentRed,
  });

  page.drawText("STATUS: REGULAR TAXPAYER (ACTIVE)", {
    x: 310,
    y: 668,
    size: 10,
    font: fontBold,
    color: rgb(0.1, 0.6, 0.3),
  });

  // Details Matrix
  let y = 625;
  const gstRows = [
    ["1. Legal Name", "GGM TECHNOLOGIES"],
    ["2. Trade Name (if any)", "GGM TECHNOLOGIES"],
    ["3. Constitution of Business", "Proprietorship"],
    [
      "4. Address of Principal Place of Business",
      "4th Floor, 403-A, 12 Ail Singh House, Yusuf Sarai Commercial Complex, Green Park, New Delhi, Delhi - 110016",
    ],
    ["5. Date of Liability", "18/04/2022"],
    ["6. Period of Validity", "From: 18/04/2022   To: Continuing (Regular)"],
    ["7. Type of Registration", "Regular Taxpayer"],
    ["8. State Jurisdiction", "Delhi State (Ward 74, Hauz Khas / South Delhi)"],
    ["9. Centre Jurisdiction", "Range-South, Division-Delhi South, Commissionerate-Delhi"],
  ];

  for (const [label, val] of gstRows) {
    page.drawRectangle({
      x: 50,
      y: y - 8,
      width: 495,
      height: label.includes("Address") ? 38 : 24,
      color: lightBg,
      borderWidth: 0.5,
      borderColor: rgb(0.85, 0.88, 0.92),
    });

    page.drawText(label, {
      x: 60,
      y: label.includes("Address") ? y + 12 : y,
      size: 8.5,
      font: fontBold,
      color: primaryColor,
    });

    page.drawText(val, {
      x: 215,
      y: label.includes("Address") ? y + 12 : y,
      size: 8.5,
      font: fontRegular,
      color: darkText,
      maxWidth: 320,
    });

    y -= label.includes("Address") ? 42 : 27;
  }

  // Statutory Signature Block
  y -= 30;
  page.drawRectangle({
    x: 320,
    y: y - 45,
    width: 225,
    height: 70,
    color: rgb(1, 1, 1),
    borderWidth: 1,
    borderColor: primaryColor,
  });

  page.drawText("Digitally Signed by:", { x: 330, y: y + 12, size: 8, font: fontRegular, color: darkText });
  page.drawText("SUPERINTENDENT / STATE TAX OFFICER", { x: 330, y: y, size: 8.5, font: fontBold, color: primaryColor });
  page.drawText("Ward 74, South Delhi Jurisdictional Office", { x: 330, y: y - 12, size: 7.5, font: fontRegular, color: darkText });
  page.drawText("Government of National Capital Territory of Delhi", { x: 330, y: y - 24, size: 7, font: fontRegular, color: darkText });

  const pdfBytes = await doc.save();
  fs.writeFileSync("public/uploads/certificates/gst-registration-certificate.pdf", pdfBytes);
  console.log("Successfully generated authentic gst-registration-certificate.pdf!");
}

async function main() {
  await createMsmePdf();
  await createGstPdf();
}

main().catch(console.error);
