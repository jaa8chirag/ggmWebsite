import { notFound } from "next/navigation";
import { getLegalPageBySlug, getCertificates } from "@/lib/queries";
import LegalPageForm from "@/components/admin/legal/LegalPageForm";
import CertificateManager from "@/components/admin/certificates/CertificateManager";
import { updateLegalPage } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminEditLegalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await getLegalPageBySlug(id);

  if (!page) notFound();

  const isCertifications = page.slug === "certifications" || page.id === "certifications";
  const certificates = isCertifications ? await getCertificates() : [];

  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="font-display text-2xl font-bold text-chalk">
          Edit {page.title}
        </h1>
        <p className="mt-1 font-body text-sm text-muted">
          Update legal disclaimers, policy body with rich text &amp; links, and SEO metadata.
        </p>
      </div>

      {isCertifications && (
        <div className="border-b border-chalk/15 pb-10">
          <CertificateManager initialCertificates={certificates} />
        </div>
      )}

      <div>
        <h2 className="font-display text-lg font-bold text-chalk mb-4">
          Page Narrative &amp; Rich Text Content
        </h2>
        <LegalPageForm
          action={updateLegalPage.bind(null, page.id)}
          page={page}
        />
      </div>
    </div>
  );
}
