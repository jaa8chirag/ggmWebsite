"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { COUNTRY_CODES, type CountryCodeItem } from "@/data/countryCodes";

export { COUNTRY_CODES, type CountryCodeItem };

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
  const currentItem =
    COUNTRY_CODES.find((c) => c.code === selectedCode) || COUNTRY_CODES[0];

  return (
    <div
      className={`relative inline-flex items-center shrink-0 border-r border-chalk/15 transition-colors hover:border-chalk/30 ${className}`}
    >
      {/* Visual pill: Flag + Code + Dropdown Arrow */}
      <div className="flex items-center gap-1.5 pl-3 pr-6 py-2.5 font-mono text-xs sm:text-sm font-bold text-chalk pointer-events-none select-none">
        <span className="text-sm leading-none" role="img" aria-label={currentItem?.name}>
          {currentItem?.flag || "🌐"}
        </span>
        <span>{selectedCode}</span>
      </div>

      {/* Full native select overlaying the pill with all 241 world country codes */}
      <select
        value={selectedCode}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-label="Select Country Dial Code"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-base bg-ink"
      >
        {COUNTRY_CODES.map((c) => (
          <option
            key={`${c.iso}-${c.code}`}
            value={c.code}
            className="bg-ink text-chalk py-1"
          >
            {c.flag} {c.name} ({c.code})
          </option>
        ))}
      </select>

      <ChevronDown
        size={12}
        className="pointer-events-none absolute right-2 text-muted"
        aria-hidden="true"
      />
    </div>
  );
}
