"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

interface FormValues {
  name: string;
  email: string;
  service: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  service: "",
  message: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Tell us your name.";
  }

  if (!values.email.trim()) {
    errors.email = "We need an email to reply to.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "That doesn't look like a valid email.";
  }

  if (!values.message.trim()) {
    errors.message = "Give us a line or two on what you need.";
  } else if (values.message.trim().length < 10) {
    errors.message = "A little more detail helps — at least 10 characters.";
  }

  return errors;
}

export default function ContactForm({
  services,
}: {
  services: { slug: string; title: string }[];
}) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof FormValues, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // Re-validate live once a field has been touched, so a fixed error clears
    // immediately rather than lingering until blur — a stale error message
    // shifts layout, which can make a click on Submit land somewhere else
    // entirely if the shift happens between mousedown and mouseup.
    if (touched[field]) {
      setErrors(validate(next));
    }
  };

  const handleBlur = (field: keyof FormValues) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, service: true, message: true });

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-flow/30 bg-surface p-10">
        <CheckCircle2 size={32} className="text-flow" />
        <h2 className="font-display text-2xl text-chalk">
          Message sent.
        </h2>
        <p className="max-w-sm font-body text-body text-muted">
          Thanks, {values.name.split(" ")[0]}. We&apos;ll get back to you
          within one business day.
        </p>
        <Button variant="ghost" onClick={() => {
          setValues(initialValues);
          setTouched({});
          setErrors({});
          setSubmitted(false);
        }}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="font-mono text-mono-label uppercase tracking-widest text-muted"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          aria-invalid={Boolean(touched.name && errors.name)}
          aria-describedby="name-error"
          className="mt-2 w-full rounded-lg border border-chalk/15 bg-transparent px-4 py-3 font-body text-chalk placeholder:text-muted/50 focus:border-flow"
          placeholder="Your name"
        />
        <p id="name-error" className="mt-2 min-h-4 font-mono text-xs text-signal">
          {touched.name ? errors.name : ""}
        </p>
      </div>

      <div>
        <label
          htmlFor="email"
          className="font-mono text-mono-label uppercase tracking-widest text-muted"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
          onBlur={() => handleBlur("email")}
          aria-invalid={Boolean(touched.email && errors.email)}
          aria-describedby="email-error"
          className="mt-2 w-full rounded-lg border border-chalk/15 bg-transparent px-4 py-3 font-body text-chalk placeholder:text-muted/50 focus:border-flow"
          placeholder="you@company.com"
        />
        <p id="email-error" className="mt-2 min-h-4 font-mono text-xs text-signal">
          {touched.email ? errors.email : ""}
        </p>
      </div>

      <div>
        <label
          htmlFor="service"
          className="font-mono text-mono-label uppercase tracking-widest text-muted"
        >
          What do you need? (optional)
        </label>
        <select
          id="service"
          value={values.service}
          onChange={(e) => handleChange("service", e.target.value)}
          className="mt-2 w-full rounded-lg border border-chalk/15 bg-transparent px-4 py-3 font-body text-chalk focus:border-flow"
        >
          <option value="" className="bg-surface">
            Select a service
          </option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug} className="bg-surface">
              {service.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="font-mono text-mono-label uppercase tracking-widest text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          onBlur={() => handleBlur("message")}
          aria-invalid={Boolean(touched.message && errors.message)}
          aria-describedby="message-error"
          className="mt-2 w-full rounded-lg border border-chalk/15 bg-transparent px-4 py-3 font-body text-chalk placeholder:text-muted/50 focus:border-flow"
          placeholder="What are you trying to grow?"
        />
        <p id="message-error" className="mt-2 min-h-4 font-mono text-xs text-signal">
          {touched.message ? errors.message : ""}
        </p>
      </div>

      <Button type="submit" variant="signal">
        Send message
      </Button>
    </form>
  );
}
