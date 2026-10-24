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

  const fallbackStats = {
    total: 0,
    new: 0,
    inDiscussion: 0,
    hotDeals: 0,
    won: 0,
    lost: 0,
    followUpsDueToday: 0,
    totalPipelineValue: 0,
    totalWonValue: 0,
  };

  return <LeadsCrmContainer initialLeads={leads || []} stats={stats || fallbackStats} />;
}
