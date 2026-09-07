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
  Zap,
  Users,
} from "lucide-react";
import { getCurrentAdmin } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";
import AdminSidebar from "@/components/admin/AdminSidebar";

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

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-ink text-chalk font-body">
      {/* Responsive Admin Sidebar */}
      <AdminSidebar adminEmail={admin.email} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
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
