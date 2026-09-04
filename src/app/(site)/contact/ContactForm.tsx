"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Phone, Mail, User, MessageSquare, Briefcase, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { submitQuoteRequest } from "@/app/actions/quote";

interface FormValues {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please tell us your name.";
  }

  const cleanPhone = values.phone.replace(/[\s\-\(\)]/g, "");
  if (!cleanPhone) {
    errors.phone = "Please enter your mobile / WhatsApp number.";
  } else if (cleanPhone.length < 10 || !/^[+]?[0-9]{10,15}$/.test(cleanPhone)) {
    errors.phone = "Please enter a valid 10-digit mobile number.";
  }

  if (!values.email.trim()) {
    errors.email = "Please provide an email address for project details.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "That doesn't look like a valid email address.";
  }

  return errors;
}

export default function ContactForm({
  services,
}: {
  services: { slug: string; title: string }[];
}) {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormValues, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) {
      setErrors(validate(next));
    }
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, phone: true, email: true, service: true, message: true });

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const selectedService = services.find((s) => s.slug === values.service);
      const serviceTitle = selectedService
        ? `Start a Project - ${selectedService.title}`
        : "Start a Project - General Inquiry";

      const formData = new FormData();
      formData.set("name", values.name);
      formData.set("phone", values.phone);
      formData.set("email", values.email);
      formData.set("serviceSlug", values.service || "general");
      formData.set("serviceTitle", serviceTitle);
      formData.set("message", values.message || "");
      formData.set("pageUrl", "/contact");

      const res = await submitQuoteRequest(formData);

      if (res.success) {
        setSubmitted(true);
        router.push("/thank-you");
      } else {
        setServerError(res.error || "Failed to submit. Please contact us via phone or WhatsApp.");
      }
    } catch (err) {
      setServerError("An unexpected error occurred. Please call or WhatsApp us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-5 rounded-3xl border-2 border-flow/40 bg-surface p-8 md:p-10 shadow-xl">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-500">
          <CheckCircle2 size={36} />
        </div>
        <div>
          <h2 className="font-display text-2xl font-bold text-chalk">
            Project Inquiry Received!
          </h2>
          <p className="mt-2 font-body text-sm text-muted">
            Thank you, <span className="font-semibold text-chalk">{values.name}</span>. We have logged your request for{" "}
            <span className="font-semibold text-flow">
              {services.find((s) => s.slug === values.service)?.title || "your digital growth"}
            </span>
            . Our senior technical consultant will call you shortly on{" "}
            <span className="font-mono font-semibold text-chalk">{values.phone}</span>.
          </p>
        </div>

        <div className="w-full rounded-2xl border border-chalk/10 bg-ink/50 p-4 font-mono text-xs text-muted">
          <p>✓ Instant notification dispatched to project directors</p>
          <p className="mt-1">✓ Non-disclosure &amp; direct quote review within business hours</p>
        </div>

        <Button
          variant="ghost"
          onClick={() => {
            setValues(initialValues);
            setTouched({});
            setErrors({});
            setSubmitted(false);
          }}
        >
          Submit another inquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      toolname="submitContactInquiry"
      tooldescription="Submit a comprehensive project inquiry or consultation request to GGM Technologies."
      className="space-y-5 rounded-3xl border border-chalk/20 bg-surface/70 p-6 md:p-8 shadow-lg backdrop-blur-md"
    >
      {serverError && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs font-mono text-rose-400">
          {serverError}
        </div>
      )}

      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="flex items-center gap-2 font-mono text-mono-label uppercase tracking-widest text-muted"
        >
          <User size={13} className="text-flow" /> Your Full Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          aria-invalid={Boolean(touched.name && errors.name)}
          toolparamdescription="The user's full name requesting a consultation."
          className="mt-2 w-full rounded-xl border border-chalk/20 bg-surface px-4 py-3 font-body text-chalk placeholder:text-muted/50 focus:border-flow focus:ring-1 focus:ring-flow transition-all"
          placeholder="e.g. Rahul Sharma"
        />
        {touched.name && errors.name && (
          <p className="mt-1.5 font-mono text-xs text-signal">{errors.name}</p>
        )}
      </div>

      {/* Phone Number (Crucial Field) */}
      <div>
        <label
          htmlFor="phone"
          className="flex items-center gap-2 font-mono text-mono-label uppercase tracking-widest text-muted"
        >
          <Phone size={13} className="text-signal" /> Mobile / WhatsApp Number *
        </label>
        <div className="relative mt-2">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-xs font-bold text-muted">
            +91
          </span>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            aria-invalid={Boolean(touched.phone && errors.phone)}
            toolparamdescription="The user's 10-digit Indian phone or WhatsApp number."
            className="w-full rounded-xl border border-chalk/20 bg-surface py-3 pl-14 pr-4 font-mono text-sm text-chalk placeholder:text-muted/50 focus:border-flow focus:ring-1 focus:ring-flow transition-all"
            placeholder="98765 43210"
          />
        </div>
        {touched.phone && errors.phone && (
          <p className="mt-1.5 font-mono text-xs text-signal">{errors.phone}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="flex items-center gap-2 font-mono text-mono-label uppercase tracking-widest text-muted"
        >
          <Mail size={13} className="text-flow" /> Email Address *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          aria-invalid={Boolean(touched.email && errors.email)}
          toolparamdescription="The user's business email address for proposal and report delivery."
          className="mt-2 w-full rounded-xl border border-chalk/20 bg-surface px-4 py-3 font-body text-chalk placeholder:text-muted/50 focus:border-flow focus:ring-1 focus:ring-flow transition-all"
          placeholder="rahul@company.com"
        />
        {touched.email && errors.email && (
          <p className="mt-1.5 font-mono text-xs text-signal">{errors.email}</p>
        )}
      </div>

      {/* Service */}
      <div>
        <label
          htmlFor="service"
          className="flex items-center gap-2 font-mono text-mono-label uppercase tracking-widest text-muted"
        >
          <Briefcase size={13} className="text-flow" /> What Service Do You Need? (Optional)
        </label>
        <select
          id="service"
          name="service"
          value={values.service}
          onChange={(e) => handleChange("service", e.target.value)}
          className="mt-2 w-full rounded-xl border border-chalk/20 bg-surface px-4 py-3 font-body text-chalk focus:border-flow focus:ring-1 focus:ring-flow transition-all"
        >
          <option value="" className="bg-surface">
            Select a service or general discussion
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug} className="bg-surface">
              {service.title}
            </option>
          ))}
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="flex items-center gap-2 font-mono text-mono-label uppercase tracking-widest text-muted"
        >
          <MessageSquare size={13} className="text-flow" /> Tell Us About Your Project (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          toolparamdescription="Detailed description of the user's project requirements, timeline, or goals."
          className="mt-2 w-full rounded-xl border border-chalk/20 bg-surface px-4 py-3 font-body text-chalk placeholder:text-muted/50 focus:border-flow focus:ring-1 focus:ring-flow transition-all"
          placeholder="Briefly describe your goals, timeline, or current website URL..."
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-signal py-3.5 px-6 font-mono text-xs font-bold uppercase tracking-widest text-chalk shadow-lg hover:bg-flow hover:text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Submitting Your Request...
          </>
        ) : (
          "Start Project & Get Call"
        )}
      </button>

      <p className="text-center font-mono text-[11px] text-muted">
        ⚡ Guaranteed response within 15 minutes during working hours.
      </p>
    </form>
  );
}
