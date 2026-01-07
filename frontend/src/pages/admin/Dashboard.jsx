import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

const Dashboard = () => {
  return (
    <div className="flex bg-[#f8f9fb]">
      <AdminSidebar />

      <div className="flex-1">
        <AdminHeader title="Dashboard" />

        <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {["States", "Cities", "Places"].map((item) => (
            <div
              key={item}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              <p className="text-gray-500">{item}</p>
              <p className="text-2xl font-bold text-[#2563eb] mt-2">—</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
