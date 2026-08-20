import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
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
} from "lucide-react";
import { getCurrentAdmin } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const navGroups = [
    {
      label: "CMS Content",
      links: [
        { href: "/admin", label: "Overview", icon: LayoutDashboard },
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

  return (
    <div className="flex h-screen overflow-hidden bg-ink text-chalk font-body">
      {/* Sidebar Navigation - Fixed & Non-scrolling */}
      <aside className="sticky top-0 h-screen w-72 shrink-0 flex flex-col justify-between overflow-y-auto border-r-2 border-chalk/30 bg-surface px-6 py-8 shadow-xl">
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
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
            className="mt-6 flex items-center justify-between rounded-xl border-2 border-chalk/25 bg-ink/60 px-4 py-2.5 font-mono text-xs text-muted transition-colors hover:border-flow hover:text-flow"
          >
            <span className="flex items-center gap-2">
              <GlobeIcon className="h-3.5 w-3.5 text-flow" /> View Public Site
            </span>
            <ExternalLink size={12} />
          </a>

          {/* Navigation Group Links */}
          <nav className="mt-8 space-y-7">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="px-3 font-mono text-[0.65rem] uppercase tracking-widest text-muted/70 font-semibold">
                  {group.label}
                </p>
                <ul className="mt-2.5 space-y-1">
                  {group.links.map((link) => {
                    const Icon = link.icon;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-body text-sm font-medium text-chalk transition-all duration-200 hover:bg-ink hover:text-flow"
                        >
                          <Icon size={18} className="text-muted/80" />
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
        <div className="border-t-2 border-chalk/25 pt-5 mt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-flow/15 text-flow font-mono font-bold text-xs border border-flow/30">
              <ShieldCheck size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-mono text-xs font-semibold text-chalk">
                {admin.email}
              </p>
              <p className="font-mono text-[0.65rem] text-muted">Super Admin</p>
            </div>
          </div>

          <form action={logoutAction} className="mt-4">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-chalk/25 bg-ink/40 py-2 font-mono text-xs uppercase tracking-widest text-muted transition-all duration-200 hover:border-signal/50 hover:bg-signal/10 hover:text-signal"
            >
              <LogOut size={14} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area - Scrollable Independently */}
      <main className="h-screen flex-1 overflow-y-auto px-10 py-10">
        <div className="mx-auto max-w-[1280px]">{children}</div>
      </main>
    </div>
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
