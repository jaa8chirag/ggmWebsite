import ServiceForm from "@/components/admin/services/ServiceForm";
import { createService } from "../actions";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">New service</h1>
      <div className="mt-8">
        <ServiceForm action={createService} />
      </div>
    </div>
  );
}
