import { useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import AdminTable from "../../components/admin/AdminTable";
import { useLocationStore } from "../../store";

const States = () => {
  const { states, fetchStates, loading } = useLocationStore();

  useEffect(() => {
    fetchStates();
  }, []);

  const columns = ["State Name", "Code"];
  const data = states.map((s) => ({
    name: s.name,
    code: s.code || "-",
  }));

  return (
    <div className="flex bg-[#f8f9fb]">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="States" />

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

export default States;
