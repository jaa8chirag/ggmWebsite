import CaseStudyForm from "@/components/admin/work/CaseStudyForm";
import { createCaseStudy } from "../actions";

export default function NewCaseStudyPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">New case study</h1>
      <div className="mt-8">
        <CaseStudyForm action={createCaseStudy} />
      </div>
    </div>
  );
}
