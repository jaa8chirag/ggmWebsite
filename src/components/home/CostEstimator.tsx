"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Calculator,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  TrendingUp,
  ShoppingCart,
  Smartphone,
  MessageSquare,
  Check,
} from "lucide-react";
import { submitQuoteRequest } from "@/app/actions/quote";

interface Addon {
  id: string;
  name: string;
  price: number;
  popular?: boolean;
}

interface ServiceOption {
  id: string;
  name: string;
  icon: any;
  basePrice: number;
  description: string;
  scopeOptions: { id: string; label: string; multiplier: number; fixedPrice?: number }[];
  addons: Addon[];
}

const SERVICES: ServiceOption[] = [
  {
    id: "web-dev",
    name: "Business Website",
    icon: Globe,
    basePrice: 28000,
    description: "High-converting corporate, company & startup websites",
    scopeOptions: [
      { id: "starter", label: "Starter Business (1-5 Pages)", multiplier: 1.0 },
      { id: "growth", label: "Growth Corporate (6-15 Pages)", multiplier: 1.5 },
      { id: "custom", label: "Enterprise Custom Portal", multiplier: 2.2 },
    ],
    addons: [
      { id: "speed", name: "95+ Google PageSpeed Turbo Optimization", price: 3000, popular: true },
      { id: "seo_setup", name: "Technical On-Page SEO & Schema Markup", price: 3500, popular: true },
      { id: "whatsapp", name: "Direct WhatsApp & Instant Call Integration", price: 1500 },
      { id: "payment", name: "Razorpay / UPI Payment Gateway Integration", price: 3500 },
      { id: "admin_cms", name: "Content Management Panel (Self-edit content)", price: 4500, popular: true },
      { id: "cloud_ssl", name: "1-Yr Fast Cloud Hosting & SSL Certificate", price: 3000 },
    ],
  },
  {
    id: "ecommerce",
    name: "E-Commerce Store",
    icon: ShoppingCart,
    basePrice: 35000,
    description: "High-conversion online shopping stores & checkout funnels",
    scopeOptions: [
      { id: "starter", label: "Starter (Up to 10 Products)", multiplier: 1.0, fixedPrice: 35000 },
      { id: "growth", label: "Growth (Up to 50 Products)", multiplier: 1.42857, fixedPrice: 50000 },
      { id: "pro", label: "Enterprise (Up to 100 Products)", multiplier: 2.28571, fixedPrice: 80000 },
    ],
    addons: [
      { id: "ecom_payment", name: "Payment Gateway (Razorpay/Paytm/COD)", price: 3500, popular: true },
      { id: "shiprocket", name: "Shipping API Setup (Shiprocket/Delhivery)", price: 4000, popular: true },
      { id: "whatsapp_order", name: "Automated WhatsApp Order & Tracking Alerts", price: 2500 },
      { id: "abandoned_cart", name: "Abandoned Cart Recovery System", price: 3500, popular: true },
      { id: "discounts", name: "Coupon Codes & Multi-Tier Discounts", price: 2500 },
      { id: "inventory_mgmt", name: "Real-Time Inventory & Stock Management", price: 4000 },
    ],
  },
  {
    id: "mobile-app",
    name: "Mobile App (iOS & Android)",
    icon: Smartphone,
    basePrice: 45000,
    description: "Native & cross-platform high-performance mobile applications",
    scopeOptions: [
      { id: "android", label: "Android App Only (Google Play)", multiplier: 1.0 },
      { id: "ios", label: "iOS App Only (Apple App Store)", multiplier: 1.15 },
      { id: "dual", label: "Dual Platform (Both Android & iOS)", multiplier: 1.5 },
    ],
    addons: [
      { id: "push_notifications", name: "Firebase Push Notifications & Messaging", price: 3500, popular: true },
      { id: "store_publishing", name: "Play Store & App Store Publishing & Approval", price: 5000, popular: true },
      { id: "in_app_payment", name: "In-App Payment Gateway & Subscriptions", price: 4500 },
      { id: "biometric_auth", name: "Biometric Login (FaceID / Fingerprint) + OTP", price: 3000, popular: true },
      { id: "backend_api", name: "High-Speed REST API Backend & Cloud Database", price: 6000 },
      { id: "offline_sync", name: "Offline Mode & Local Storage Cache", price: 3500 },
    ],
  },
  {
    id: "seo-marketing",
    name: "SEO & Digital Marketing",
    icon: TrendingUp,
    basePrice: 22000,
    description: "Top Google rankings, keyword dominance & qualified customer leads",
    scopeOptions: [
      { id: "local", label: "Local SEO (City & Google Maps Pack)", multiplier: 1.0 },
      { id: "national", label: "National Pan-India SEO Growth", multiplier: 1.6 },
      { id: "aggressive", label: "Aggressive SEO + Content Dominance", multiplier: 2.5 },
    ],
    addons: [
      { id: "backlinks", name: "High DA (50+) Editorial Authority Backlinks", price: 5000, popular: true },
      { id: "gmb_optimization", name: "Google My Business & Maps Local Pack Ranking", price: 3000, popular: true },
      { id: "competitor_audit", name: "In-Depth Competitor Keyword & Gap Audit", price: 3500 },
      { id: "content_articles", name: "4 High-Authority Ranking Articles / Month", price: 4500, popular: true },
      { id: "cro_audit", name: "Conversion Rate Optimization (CRO) & Heatmap", price: 3500 },
      { id: "ga4_tracking", name: "Google Analytics 4 & Conversion Event Setup", price: 2500 },
    ],
  },
];

function resolveServiceId(slug?: string): string {
  if (!slug) return "seo-marketing";
  const s = slug.toLowerCase();
  if (s.includes("app") || s.includes("mobile") || s.includes("ios") || s.includes("android")) {
    return "mobile-app";
  }
  if (s.includes("seo") || s.includes("ppc") || s.includes("google") || s.includes("marketing") || s.includes("lead")) {
    return "seo-marketing";
  }
  if (s.includes("e-commerce") || s.includes("ecommerce") || s.includes("shopify")) {
    return "ecommerce";
  }
  return "web-dev";
}

interface CostEstimatorProps {
  initialServiceSlug?: string;
  title?: string;
  subtitle?: string;
}

export default function CostEstimator({
  initialServiceSlug,
  title = "Calculate Your Project Cost in 30 Seconds",
  subtitle = "Transparent pricing with zero hidden charges. Select your requirements below to see an instant live price estimate and lock in special agency discounts.",
}: CostEstimatorProps) {
  const defaultId = resolveServiceId(initialServiceSlug);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(defaultId);

  const currentService = useMemo(() => {
    return SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  }, [selectedServiceId]);

  // Initial state: Cheapest tier (multiplier 1.0) and ZERO add-ons selected
  const [selectedScopeId, setSelectedScopeId] = useState<string>(currentService.scopeOptions[0].id);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [deliverySpeed, setDeliverySpeed] = useState<"standard" | "express">("standard");

  // Form State
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const targetService = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];
    setSelectedScopeId(targetService.scopeOptions[0].id);
    setSelectedAddons([]); // Zero top-ups / add-ons selected by default
  };

  const currentScope = useMemo(() => {
    return (
      currentService.scopeOptions.find((sc) => sc.id === selectedScopeId) ||
      currentService.scopeOptions[0]
    );
  }, [currentService, selectedScopeId]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Price Calculation
  const estimatedPrice = useMemo(() => {
    let base = currentScope.fixedPrice ?? (currentService.basePrice * currentScope.multiplier);
    const addonsTotal = selectedAddons.reduce((sum, id) => {
      const addon = currentService.addons.find((a) => a.id === id);
      return sum + (addon ? addon.price : 0);
    }, 0);

    let total = base + addonsTotal;
    if (deliverySpeed === "express") {
      total *= 1.2; // 20% express turnaround
    }

    const lowEstimate = Math.round(total / 500) * 500;
    const highEstimate = Math.round((total * 1.25) / 500) * 500;

    return {
      low: lowEstimate,
      high: highEstimate,
      formattedLow: `₹${lowEstimate.toLocaleString("en-IN")}`,
      formattedHigh: `₹${highEstimate.toLocaleString("en-IN")}`,
    };
  }, [currentService, currentScope, selectedAddons, deliverySpeed]);

  async function handleSubmitEstimate(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const chosenAddonNames = selectedAddons
      .map((id) => currentService.addons.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const fullDetails = `Calculated Estimate: ${estimatedPrice.formattedLow} - ${estimatedPrice.formattedHigh}
Service: ${currentService.name} (${currentScope.label})
Timeline: ${deliverySpeed === "express" ? "Express Turnaround" : "Standard Delivery"}
Add-ons: ${chosenAddonNames || "None"}`;

    const formData = new FormData();
    formData.set("name", clientName);
    formData.set("phone", clientPhone);
    formData.set("serviceTitle", currentService.name);
    formData.set("serviceSlug", currentService.id);
    formData.set("source", "COST_CALCULATOR");
    formData.set("approxAmount", `${estimatedPrice.formattedLow} - ${estimatedPrice.formattedHigh}`);
    formData.set("message", fullDetails);
    formData.set("pageUrl", typeof window !== "undefined" ? window.location.pathname : "/");

    const res = await submitQuoteRequest(formData);

    setIsSubmitting(false);
    if (res.success) {
      setSubmittedMessage(
        `Thank you ${clientName}! Your customized proposal of ${estimatedPrice.formattedLow} for ${currentService.name} has been locked in. Our lead specialist will connect with you via WhatsApp shortly.`
      );
    } else {
      setErrorMessage(res.error || "Failed to submit estimate. Please try again.");
    }
  }

  return (
    <section id="cost-estimator" className="relative py-16 sm:py-24 bg-ink overflow-hidden border-t border-b border-chalk/10">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-flow/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[300px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-flow/30 bg-flow/10 px-4 py-1.5 font-mono text-xs font-semibold text-flow shadow-sm">
            <Calculator size={14} />
            <span>Interactive Project Estimator</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold text-chalk tracking-tight">
            {title}
          </h2>
          <p className="font-body text-sm sm:text-base text-muted max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Main Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Select Service */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-chalk">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-flow text-ink font-bold text-xs">
                  1
                </span>
                <span>Select Service Category</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((srv) => {
                  const Icon = srv.icon;
                  const isSelected = selectedServiceId === srv.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => handleServiceChange(srv.id)}
                      className={`text-left p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? "border-flow bg-flow/10 shadow-lg shadow-flow/10 text-chalk"
                          : "border-chalk/15 bg-surface hover:border-chalk/30 text-muted hover:text-chalk"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl border ${
                            isSelected
                              ? "bg-flow text-ink border-flow"
                              : "bg-ink text-flow border-chalk/20"
                          }`}
                        >
                          <Icon size={18} />
                        </div>
                        {isSelected && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-flow text-ink">
                            <Check size={12} strokeWidth={3} />
                          </span>
                        )}
                      </div>
                      <h4 className="font-heading font-bold text-sm text-chalk">{srv.name}</h4>
                      <p className="font-body text-xs text-muted mt-1 line-clamp-1">
                        {srv.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Scope (e.g. Android only, iOS only, Both) */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-chalk">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-flow text-ink font-bold text-xs">
                  2
                </span>
                <span>
                  {selectedServiceId === "mobile-app"
                    ? "Choose Platform Scope (Android / iOS / Both)"
                    : "Project Scale & Deliverable Scope"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentService.scopeOptions.map((scope) => {
                  const isSelected = selectedScopeId === scope.id;
                  return (
                    <button
                      key={scope.id}
                      type="button"
                      onClick={() => setSelectedScopeId(scope.id)}
                      className={`p-3.5 rounded-xl border font-mono text-xs text-center transition-all cursor-pointer ${
                        isSelected
                          ? "border-flow bg-flow text-ink font-bold shadow-md shadow-flow/20"
                          : "border-chalk/15 bg-surface text-muted hover:border-chalk/30 hover:text-chalk font-semibold"
                      }`}
                    >
                      {scope.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Service-Specific Add-ons */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between font-mono text-xs font-bold uppercase tracking-wider text-chalk">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-flow text-ink font-bold text-xs">
                    3
                  </span>
                  <span>
                    {currentService.name} Add-ons (Tailored Features)
                  </span>
                </div>
                <span className="text-[0.7rem] text-flow font-medium">Click to toggle</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentService.addons.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer select-none ${
                        isChecked
                          ? "border-emerald-500/50 bg-emerald-500/10 text-chalk shadow-sm"
                          : "border-chalk/15 bg-surface text-muted hover:border-chalk/30 hover:text-chalk"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 pr-2">
                        <div
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                            isChecked
                              ? "bg-emerald-500 border-emerald-500 text-ink"
                              : "border-chalk/30 bg-ink"
                          }`}
                        >
                          {isChecked && <Check size={12} strokeWidth={3} />}
                        </div>
                        <span className="font-body text-xs font-medium truncate">{addon.name}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-emerald-400 shrink-0">
                        +₹{addon.price.toLocaleString("en-IN")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Turnaround Speed */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-chalk">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-flow text-ink font-bold text-xs">
                  4
                </span>
                <span>Timeline Preference</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliverySpeed("standard")}
                  className={`p-3 rounded-xl border font-mono text-xs text-center transition-all cursor-pointer ${
                    deliverySpeed === "standard"
                      ? "border-flow bg-flow/15 text-flow font-bold"
                      : "border-chalk/15 bg-surface text-muted hover:border-chalk/30"
                  }`}
                >
                  🚀 Standard Delivery (Planned Sprints)
                </button>
                <button
                  type="button"
                  onClick={() => setDeliverySpeed("express")}
                  className={`p-3 rounded-xl border font-mono text-xs text-center transition-all cursor-pointer ${
                    deliverySpeed === "express"
                      ? "border-amber-400 bg-amber-400/15 text-amber-400 font-bold"
                      : "border-chalk/15 bg-surface text-muted hover:border-chalk/30"
                  }`}
                >
                  ⚡ Express Priority (Rapid Turnaround)
                </button>
              </div>
            </div>
          </div>

          {/* Live Estimate Card & Direct Lead Capture (5 cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-3xl border border-chalk/20 bg-surface/90 backdrop-blur-xl p-6 sm:p-7 shadow-2xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-l from-flow to-emerald-400 font-mono text-[0.65rem] font-extrabold uppercase tracking-widest text-ink rounded-bl-xl shadow-md">
                Live Agency Quote
              </div>

              {/* Price Calculation Box */}
              <div className="space-y-2 pt-2">
                <span className="font-mono text-xs uppercase tracking-wider text-muted font-semibold flex items-center gap-1.5">
                  <Sparkles size={14} className="text-flow" /> Estimated Investment
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-3xl sm:text-4xl font-extrabold text-chalk">
                    {estimatedPrice.formattedLow}
                  </span>
                  <span className="text-sm font-mono text-muted">to</span>
                  <span className="font-heading text-xl sm:text-2xl font-bold text-flow">
                    {estimatedPrice.formattedHigh}
                  </span>
                </div>
                <p className="font-mono text-[0.7rem] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck size={13} /> Transparent milestone pricing • Zero hidden fees
                </p>
              </div>

              {/* Summary of chosen items */}
              <div className="rounded-2xl border border-chalk/15 bg-ink/70 p-4 space-y-2.5 font-mono text-xs">
                <div className="flex items-center justify-between text-muted">
                  <span>Selected Service:</span>
                  <span className="text-chalk font-semibold">{currentService.name}</span>
                </div>
                <div className="flex items-center justify-between text-muted">
                  <span>Scope:</span>
                  <span className="text-flow font-semibold">{currentScope.label}</span>
                </div>
                <div className="flex items-center justify-between text-muted">
                  <span>Active Add-ons:</span>
                  <span className="text-emerald-400 font-semibold">{selectedAddons.length} Selected</span>
                </div>
                <div className="flex items-center justify-between text-muted">
                  <span>Timeline:</span>
                  <span className="text-chalk">
                    {deliverySpeed === "express" ? "Express Priority" : "Standard Delivery"}
                  </span>
                </div>
              </div>

              {/* Direct Proposal Lead Capture Form */}
              {submittedMessage ? (
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 space-y-3 text-center animate-fadeIn">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-ink mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="font-heading font-bold text-base text-chalk">Estimate Locked In!</h4>
                  <p className="font-body text-xs text-muted">{submittedMessage}</p>
                  <a
                    href={`https://wa.me/919002600880?text=${encodeURIComponent(
                      `Hello GGM Technologies! I just generated an estimate of ${estimatedPrice.formattedLow} for ${currentService.name} (${currentScope.label}). Let's discuss!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-emerald-500 px-4 py-2.5 font-mono text-xs font-bold text-ink hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <MessageSquare size={16} /> Instant WhatsApp Chat
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmitEstimate} className="space-y-3.5">
                  <p className="font-mono text-xs text-chalk font-bold uppercase tracking-wider">
                    Lock-in this price &amp; receive proposal:
                  </p>

                  {errorMessage && (
                    <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-2.5 text-xs font-mono text-rose-400">
                      {errorMessage}
                    </div>
                  )}

                  <div className="space-y-2.5">
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Your Name / Business Name *"
                      className="w-full rounded-xl border border-chalk/20 bg-ink px-4 py-2.5 font-body text-xs text-chalk placeholder-muted/50 focus:border-flow focus:outline-none"
                    />

                    <div className="flex items-center rounded-xl border border-chalk/20 bg-ink overflow-hidden focus-within:border-flow">
                      <span className="px-3 py-2.5 font-mono text-xs text-muted border-r border-chalk/20 bg-surface/50">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="10-digit WhatsApp Number *"
                        className="w-full bg-transparent px-3 py-2.5 font-body text-xs text-chalk placeholder-muted/50 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-flow to-emerald-400 px-5 py-3 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-all hover:opacity-95 shadow-xl shadow-flow/20 disabled:opacity-50 cursor-pointer"
                  >
                    <Zap size={15} className="fill-ink" />
                    <span>{isSubmitting ? "Locking In Price..." : "Get Detailed Proposal & Save Estimate"}</span>
                  </button>

                  <p className="font-mono text-[0.65rem] text-center text-muted">
                    🔒 No spam guarantee. Direct project proposal delivered to your WhatsApp.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
