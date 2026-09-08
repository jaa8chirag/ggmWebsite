import { query } from "@/lib/db";
import { deleteLocation } from "./actions";
import AdminLocationsContainer from "@/components/admin/locations/AdminLocationsContainer";

export default async function AdminLocationsPage() {
  const locations = await query<any>(
    `SELECT l.*, 
            (SELECT COUNT(*) FROM \`ServiceLocation\` sl WHERE sl.locationId = l.id) as serviceCount
     FROM \`Location\` l
     ORDER BY l.name ASC`
  );

  return (
    <AdminLocationsContainer
      locations={locations}
      deleteLocationAction={deleteLocation}
    />
  );
}
