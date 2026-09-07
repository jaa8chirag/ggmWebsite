"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Boxes,
  MapPin,
  FileText,
  Briefcase,
  ShoppingBag,
  MessageSquareQuote,
  Settings,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Search,
  Zap,
  Users,
  Menu,
  X,
} from "lucide-react";
import { logoutAction } from "@/app/admin/actions";

interface AdminSidebarProps {
  adminEmail: string;
}

const NAV_GROUPS = [
  {
    label: "CMS Content",
    links: [
      { href: "/admin", label: "Overview", icon: LayoutDashboard },
      { href: "/admin/leads", label: "Lead Management CRM", icon: Users },
      { href: "/admin/quotes", label: "Quotes & Leads", icon: Zap },
      { href: "/admin/services", label: "Services", icon: Boxes },
      { href: "/admin/locations", label: "Locations", icon: MapPin },
      { href: "/admin/blog", label: "Blog Posts", icon: FileText },
      { href: "/admin/work", label: "Case Studies", icon: Briefcase },
      { href: "/admin/shop", label: "Shop Products", icon: ShoppingBag },
      { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
    ],
  },
  {
    label: "Configuration & Governance",
    links: [
      { href: "/admin/legal", label: "Legal & Policies", icon: ShieldCheck },
      { href: "/admin/seo-tools", label: "SEO & Ahrefs Hub", icon: Search },
      { href: "/admin/settings", label: "Site Settings", icon: Settings },
    ],
  },
];

export default function AdminSidebar({ adminEmail }: AdminSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const renderNavContent = () => (
    <div className="flex h-full flex-col justify-between overflow-y-auto px-6 py-6">
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between">
          <Link href="/admin" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
            <Image
              src="/logo/ggm-logo.png"
              alt="GGM Technologies"
              width={140}
              height={50}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <span className="rounded-full bg-signal/15 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-widest text-signal font-semibold border border-signal/30">
            CMS Admin
          </span>
        </div>

        {/* Live Site Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex items-center justify-between rounded-xl border border-chalk/25 bg-ink/60 px-4 py-2.5 font-mono text-xs text-muted transition-colors hover:border-flow hover:text-flow"
        >
          <span className="flex items-center gap-2">
            <GlobeIcon className="h-3.5 w-3.5 text-flow" /> View Public Site
          </span>
          <ExternalLink size={12} />
        </a>

        {/* Navigation Groups */}
        <nav className="mt-8 space-y-7">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="px-3 font-mono text-[0.65rem] uppercase tracking-widest text-muted/70 font-semibold">
                {group.label}
              </p>
              <ul className="mt-2.5 space-y-1">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-body text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "bg-flow text-ink font-bold shadow-md"
                            : "text-chalk hover:bg-ink hover:text-flow"
                        }`}
                      >
                        <Icon size={18} className={isActive ? "text-ink" : "text-muted/80"} />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Admin Footer & Logout */}
      <div className="border-t border-chalk/25 pt-5 mt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-flow/15 text-flow font-mono font-bold text-xs border border-flow/30">
            <ShieldCheck size={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-mono text-xs font-semibold text-chalk">{adminEmail}</p>
            <p className="font-mono text-[0.65rem] text-muted">Super Admin</p>
          </div>
        </div>

        <form action={logoutAction} className="mt-4">
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-chalk/25 bg-ink/40 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-all duration-200 hover:border-signal/50 hover:bg-signal/10 hover:text-signal"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* MOBILE TOP HEADER BAR (Only visible on screens < lg) */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-chalk/20 bg-surface/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/logo/ggm-logo.png"
            alt="GGM Technologies"
            width={120}
            height={40}
            className="h-7 w-auto object-contain"
          />
          <span className="rounded-full bg-signal/15 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-signal font-bold border border-signal/30">
            Admin
          </span>
        </Link>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 rounded-xl border border-chalk/20 bg-ink px-3 py-2 font-mono text-xs font-semibold text-chalk hover:text-flow"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          <span>Menu</span>
        </button>
      </header>

      {/* DESKTOP SIDEBAR (Visible on screens >= lg) */}
      <aside className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:w-72 lg:shrink-0 lg:flex-col lg:border-r-2 lg:border-chalk/30 lg:bg-surface lg:shadow-xl">
        {renderNavContent()}
      </aside>

      {/* MOBILE SLIDE-OVER DRAWER (Only when mobileOpen is true) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop Blur */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Sidebar */}
          <div className="relative flex w-4/5 max-w-xs flex-1 flex-col bg-surface shadow-2xl z-10 border-r border-chalk/20">
            <div className="absolute right-3 top-3">
              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-muted hover:bg-ink hover:text-chalk"
              >
                <X size={20} />
              </button>
            </div>
            {renderNavContent()}
          </div>
        </div>
      )}
    </>
  );
}

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
