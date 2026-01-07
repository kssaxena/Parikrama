import { useEffect } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminTable from "../../components/admin/AdminTable";
import { usePlaceStore } from "../../store";

const Places = () => {
  const { places, fetchAllPlaces, loading } = usePlaceStore();

  useEffect(() => {
    fetchAllPlaces();
  }, []);

  const columns = ["Place Name", "City", "Category"];
  const data = places.map((p) => ({
    name: p.name,
    city: p.city?.name || "-",
    category: p.category,
  }));

  return (
    <div className="flex bg-[#f8f9fb]">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Places" />

        <div className="p-6">
          <div className="mb-4 text-right">
            <Link
              to="/admin/places/new"
              className="bg-[#2563eb] text-white px-4 py-2 rounded-lg"
            >
              Add Place
            </Link>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <AdminTable columns={columns} data={data} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Places;
