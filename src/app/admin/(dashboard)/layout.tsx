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
import AdminContentWrapper from "@/components/admin/AdminContentWrapper";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="flex min-h-screen lg:h-screen lg:overflow-hidden flex-col lg:flex-row bg-ink text-chalk font-body">
      {/* Responsive Admin Sidebar */}
      <AdminSidebar adminEmail={admin.email} />

      {/* Main Content Area (Full Bleed for Leads CRM, Standard for others) */}
      <AdminContentWrapper>
        {children}
      </AdminContentWrapper>
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
