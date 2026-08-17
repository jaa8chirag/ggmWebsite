"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-ink px-6 py-12">
      {/* Background Subtle Glowing Gradients */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-flow/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/3 h-80 w-80 rounded-full bg-signal/15 blur-3xl"
        aria-hidden="true"
      />

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border-2 border-chalk/30 bg-surface/95 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <Image
            src="/logo/ggm-mark.png"
            alt="GGM Technologies"
            width={130}
            height={50}
            className="h-9 w-auto"
            priority
          />
          <span className="flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/15 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-signal font-semibold">
            <ShieldCheck size={12} /> Secure Login
          </span>
        </div>

        <h1 className="mt-8 font-display text-3xl text-chalk">CMS Admin Portal</h1>
        <p className="mt-2 font-body text-sm text-muted">
          Sign in with your admin credentials to manage content, SEO settings, and multi-location hubs.
        </p>

        <form action={formAction} className="mt-8 space-y-6">
          <div>
            <label
              htmlFor="email"
              className="flex items-center gap-2 font-mono text-mono-label uppercase tracking-widest text-muted"
            >
              <Mail size={14} className="text-flow" /> Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="mt-2 w-full rounded-xl border-2 border-chalk/30 bg-ink/50 px-4 py-3 font-body text-chalk placeholder:text-muted/40 transition-colors focus:border-flow focus:bg-surface focus:outline-none"
              placeholder="admin@ggmtechnologies.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="flex items-center gap-2 font-mono text-mono-label uppercase tracking-widest text-muted"
            >
              <Lock size={14} className="text-signal" /> Account Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="mt-2 w-full rounded-xl border-2 border-chalk/30 bg-ink/50 px-4 py-3 font-body text-chalk placeholder:text-muted/40 transition-colors focus:border-flow focus:bg-surface focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {state.error && (
            <div className="rounded-xl border border-signal/30 bg-signal/10 px-4 py-3 font-mono text-xs text-signal">
              {state.error}
            </div>
          )}

          <Button type="submit" variant="signal" className="w-full justify-center py-3 text-sm font-semibold">
            {pending ? "Authenticating…" : "Sign in to Dashboard"}
          </Button>
        </form>

        <div className="mt-8 border-t border-chalk/15 pt-4 text-center">
          <p className="font-mono text-[0.7rem] text-muted">
            GGM Technologies Content Management System v2.0
          </p>
        </div>
      </div>
    </div>
  );
}
