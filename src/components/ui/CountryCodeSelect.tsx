"use client";

import React from "react";

export interface CountryCodeItem {
  code: string; // e.g. "+91"
  iso: string;  // e.g. "IN"
  name: string; // e.g. "India"
  flag: string; // e.g. "🇮🇳"
}

export const COUNTRY_CODES: CountryCodeItem[] = [
  { code: "+91", iso: "IN", name: "India", flag: "🇮🇳" },
  { code: "+1", iso: "US", name: "United States", flag: "🇺🇸" },
  { code: "+44", iso: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "+971", iso: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "+1", iso: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "+61", iso: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "+65", iso: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "+966", iso: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+974", iso: "QA", name: "Qatar", flag: "🇶🇦" },
  { code: "+968", iso: "OM", name: "Oman", flag: "🇴🇲" },
  { code: "+965", iso: "KW", name: "Kuwait", flag: "🇰🇼" },
  { code: "+973", iso: "BH", name: "Bahrain", flag: "🇧🇭" },
  { code: "+49", iso: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "+33", iso: "FR", name: "France", flag: "🇫🇷" },
  { code: "+31", iso: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "+39", iso: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "+34", iso: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "+60", iso: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "+66", iso: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "+62", iso: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "+92", iso: "PK", name: "Pakistan", flag: "🇵🇰" },
  { code: "+880", iso: "BD", name: "Bangladesh", flag: "🇧🇩" },
  { code: "+94", iso: "LK", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "+977", iso: "NP", name: "Nepal", flag: "🇳🇵" },
  { code: "+27", iso: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "+234", iso: "NG", name: "Nigeria", flag: "🇳🇬" },
  { code: "+254", iso: "KE", name: "Kenya", flag: "🇰🇪" },
  { code: "+55", iso: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "+52", iso: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "+64", iso: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "+81", iso: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "+82", iso: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "+86", iso: "CN", name: "China", flag: "🇨🇳" },
];

interface CountryCodeSelectProps {
  selectedCode: string;
  onChange: (code: string) => void;
  className?: string;
  disabled?: boolean;
}

export default function CountryCodeSelect({
  selectedCode = "+91",
  onChange,
  className = "",
  disabled = false,
}: CountryCodeSelectProps) {
  return (
    <select
      value={selectedCode}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      aria-label="Select Country Dial Code"
      className={`shrink-0 w-[78px] max-w-[85px] border-0 bg-transparent font-mono text-[11px] font-bold text-chalk focus:outline-none cursor-pointer ${className}`}
    >
      {COUNTRY_CODES.map((c) => (
        <option key={`${c.iso}-${c.code}`} value={c.code} className="bg-ink text-chalk">
          {c.code} ({c.iso})
        </option>
      ))}
    </select>
  );
}
