import { Metadata } from "next";
import { getLeads, getLeadStats } from "@/lib/queries";
import LeadsCrmContainer from "@/components/admin/leads/LeadsCrmContainer";

export const metadata: Metadata = {
  title: "Lead Management CRM | Admin - GGM Technologies",
  description: "Advanced Lead Management CRM for website inquiries and manual lead entries.",
};

export const revalidate = 0; // Dynamic server component

export default async function AdminLeadsPage() {
  const [leads, stats] = await Promise.all([
    getLeads(),
    getLeadStats(),
  ]);

  return <LeadsCrmContainer initialLeads={leads} stats={stats} />;
}
