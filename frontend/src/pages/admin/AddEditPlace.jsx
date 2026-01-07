import { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import { usePlaceStore, useLocationStore } from "../../store";

const AddEditPlace = () => {
  const { createPlace } = usePlaceStore();
  const { states, cities } = useLocationStore();

  const [form, setForm] = useState({
    name: "",
    category: "",
    cityId: "",
    stateId: "",
    lat: "",
    lng: "",
    averageTimeSpent: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await createPlace({
      ...form,
      lat: Number(form.lat),
      lng: Number(form.lng),
    });
    alert("Place created successfully");
  };

  return (
    <div className="flex bg-[#f8f9fb]">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader title="Add Place" />

        <div className="p-6 max-w-2xl">
          <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
            <Input
              name="name"
              placeholder="Place Name"
              onChange={handleChange}
            />
            <Input
              name="category"
              placeholder="Category"
              onChange={handleChange}
            />
            <Input
              name="stateId"
              placeholder="State ID"
              onChange={handleChange}
            />
            <Input
              name="cityId"
              placeholder="City ID"
              onChange={handleChange}
            />
            <Input name="lat" placeholder="Latitude" onChange={handleChange} />
            <Input name="lng" placeholder="Longitude" onChange={handleChange} />
            <Input
              name="averageTimeSpent"
              placeholder="Average Time (mins)"
              onChange={handleChange}
            />

            <Button className="w-full" onClick={handleSubmit}>
              Save Place
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditPlace;
