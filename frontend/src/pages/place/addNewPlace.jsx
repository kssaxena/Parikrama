import React, { useRef, useState } from "react";
import Button from "../../components/Button";
import InputBox from "../../components/InputBox";
import LoadingUI from "../../components/LoadingUI";
import { FetchData } from "../../utils/FetchFromApi";
import { useSelector } from "react-redux";

const AddNewPlace = ({ startLoading, stopLoading }) => {
  const formRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user, role, isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(formRef.current);

    try {
      startLoading();

      const res = await FetchData("places", "post", formData);

      if (res?.data?.success) {
        setSuccess("Place added successfully");
        formRef.current.reset();
      }
    } catch (err) {
      console.error(err);
      setError("Failed to add place. Please check details.");
    } finally {
      stopLoading();
    }
  };

  return user ? (
    <div className="flex justify-center items-center">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className=" p-8 rounded-xl shadow-md w-3/4"
      >
        <h2 className="text-2xl font-bold mb-6">Add New Place</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-3">{success}</p>}

        <div className="grid grid-cols-2 grid-rows-2 gap-5">
          <InputBox LabelName="Place Name" Name="name" required />
          <InputBox LabelName="State ID" Name="stateId" required />
          <InputBox LabelName="City ID" Name="cityId" required />
          <InputBox LabelName="Category" Name="category" />
          <InputBox LabelName="Longitude" Name="lng" required />
          <InputBox LabelName="Latitude" Name="lat" required />
          <InputBox
            LabelName="Average Time Spent (mins)"
            Name="averageTimeSpent"
            Type="number"
          />
          <InputBox
            LabelName="Best time to Visit"
            Name="bestTimeToVisit"
            Type="number"
          />
          <InputBox LabelName="Entry Fee" Name="entryFee" Type="number" />
          <InputBox Name="popularityScore" LabelName="Popularity Score" />
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="3"
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Place Images
            </label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              className="w-full"
            />
          </div>
        </div>

        <Button label="Add Place" type="submit" className="w-full mt-4" />
      </form>
    </div>
  ) : (
    <div className="flex justify-center items-center w-full">
      <h2 className="text-2xl font-bold text-center">
        <p className="text-5xl ">⚠️</p>
        Restricted Access !! Please log in to view the dashboard.
      </h2>
    </div>
  );
};

export default LoadingUI(AddNewPlace);
