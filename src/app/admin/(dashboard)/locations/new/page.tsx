import LocationForm from "@/components/admin/locations/LocationForm";
import { createLocation } from "../actions";

export default function NewLocationPage() {
  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">New location</h1>
      <div className="mt-8">
        <LocationForm action={createLocation} />
      </div>
    </div>
  );
}
