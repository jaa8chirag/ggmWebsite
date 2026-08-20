"use client";

import React from "react";
import { Cookie } from "lucide-react";

export default function CookiePreferencesTrigger() {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-1 hover:text-flow transition-colors cursor-pointer"
    >
      <Cookie size={11} />
      <span>Cookie Preferences</span>
    </button>
  );
}
