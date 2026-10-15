import { useEffect, useRef, useState } from "react";
import InputBox from "../../components/InputBox";
import { FetchData } from "../../utils/FetchFromApi";
import LoadingUI from "../../components/LoadingUI";
import Button from "../../components/Button";

const AddFacilitatorByAdmin = ({
  startLoading,
  stopLoading,
  adminId,
  onClose,
  handleReload,
}) => {
  const [error, setError] = useState("");
  const [cities, setCities] = useState([]);
  const formRef = useRef();
  const [otherRole, setOtherRole] = useState("");

  useEffect(() => {
    const loadCities = async () => {
      try {
        startLoading();
        const res = await FetchData("cities", "get");
        setCities(res?.data?.data || []);
      } catch (err) {
        //  console.log(err);
      } finally {
        stopLoading();
      }
    };

    loadCities();
  }, []);

  const handleCityChange = (cityId) => {
    const city = cities.find((c) => c._id === cityId);

    setSelectedCity(cityId);
    setSelectedState(city?.state?._id || "");

    const cityPlaces = places.filter((p) => p.city?._id === cityId);

    setFilteredPlaces(cityPlaces);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(formRef.current);
    try {
      startLoading();
      const res = await FetchData(
        `facilitator/by-admin/register/${adminId}`,
        "post",
        formData,
      );
      console.log(res);
      alert("Facilitator added successfully !");
      handleReload();
      formRef.current.reset();
      setOtherRole("");
      onClose();
    } catch (err) {
      setError(parseErrorMessage(err?.response?.data));
    } finally {
      stopLoading();
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleRegister}
      className="bg-white p-10 rounded-md"
    >
      <h1 className="font-semibold text-2xl ">Add new facilitator</h1>
      <div>
        <div className="grid md:grid-cols-2 justify-center items-center gap-5">
          <InputBox
            LabelName="Full Name"
            Name="name"
            required
            Placeholder="Enter full name"
          />
          <InputBox
            LabelName="Phone"
            Name="phone"
            required
            Placeholder="Enter contact number"
          />
          {/* CITY */}
          <div>
            <label className="block text-sm font-medium mb-1">City*</label>
            <select
              name="city"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FFC20E] focus:border-[#FFC20E] outline-none"
              onChange={(e) => handleCityChange(e.target.value)}
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name} , {c.state?.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Role*</label>
            <select
              name="role"
              required
              value={otherRole}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#FFC20E] focus:border-[#FFC20E] outline-none"
              onChange={(c) => {
                setOtherRole(c.target.value);
                // if (setOtherRole != "Others") {
                //   setOtherRole("");
                // }
              }}
            >
              <option value="">Select role</option>
              {[
                "Travel Guide",
                "Photographer",
                "Spiritual Guide",
                "Temple Guide",
                "Tour Guide",
                "Activity Instructor",
                "Driver",
                "Boat Captain",
                "Porter",
                "Translator",
                "Geat Outfitter",
                "Itinerary Planner",
                "Agency Representative",
                "Others",
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {otherRole === "Others" ? (
            <InputBox
              LabelName="Please Specify"
              Placeholder="Tell 1-2 words.. "
              Name="otherRole"
              // required
            />
          ) : (
            ""
          )}
        </div>
        <div>
          <InputBox
            LabelName="Password"
            Name="password"
            Type="password"
            required
            Placeholder="Password"
            // PasswordIndication={true}
          />
          <Button
            label="Register"
            type="submit"
            className="w-full md:col-span-2 mt-4"
          />
        </div>
      </div>
    </form>
  );
};

export default LoadingUI(AddFacilitatorByAdmin);
