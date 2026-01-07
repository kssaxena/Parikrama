import { useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminTable from "../../components/admin/AdminTable";
import { useLocationStore } from "../../store";

const Cities = () => {
  const { cities, states, fetchStates, fetchCitiesByState, loading } =
    useLocationStore();

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (states.length) {
      fetchCitiesByState(states[0]._id);
    }
  }, [states]);

  const columns = ["City Name", "State"];
  const data = cities.map((c) => ({
    name: c.name,
    state: c.state?.name || "-",
  }));

  return (
    <div className="flex bg-[#f8f9fb]">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Cities" />

        <div className="p-6">
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

export default Cities;
