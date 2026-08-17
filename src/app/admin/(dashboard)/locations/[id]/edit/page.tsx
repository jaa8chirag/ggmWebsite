import { notFound } from "next/navigation";
import { queryOne } from "@/lib/db";
import LocationForm from "@/components/admin/locations/LocationForm";
import { updateLocation } from "../../actions";

export default async function EditLocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const location = await queryOne<any>("SELECT * FROM `Location` WHERE `id` = ?", [id]);
  if (!location) notFound();

  return (
    <div>
      <h1 className="font-display text-2xl text-chalk">
        Edit {location.name}
      </h1>
      <div className="mt-8">
        <LocationForm
          action={updateLocation.bind(null, location.id)}
          values={{
            ...location,
            isActive: Boolean(location.isActive),
          }}
        />
      </div>
    </div>
  );
}
