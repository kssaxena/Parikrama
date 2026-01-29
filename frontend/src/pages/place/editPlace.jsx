import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchData } from "../../utils/FetchFromApi";
import LoadingUI from "../../components/LoadingUI";
import { useSelector } from "react-redux";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";

const MAX_IMAGES = 5;

const EditPlace = ({ stopLoading, startLoading }) => {
  const { placeId } = useParams();
  const { user } = useSelector((state) => state.auth);

  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState(null);
  const [newImages, setNewImages] = useState([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ================= FETCH PLACE ================= */

  const loadPlace = async () => {
    try {
      startLoading();
      const res = await FetchData(`places/${placeId}`, "get");
      const p = res.data.data.place;

      setPlace(p);

      setFormData({
        name: p.name,
        category: p.category,
        description: p.description,
        averageTimeSpent: p.averageTimeSpent,
        entryFee: p.entryFee,
      });
    } catch (err) {
      setError("Failed to load place");
    } finally {
      stopLoading();
    }
  };
  useEffect(() => {
    // if (!user) return;

    loadPlace();
  }, [user, placeId]);

  /* ================= INPUT CHANGE ================= */

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= IMAGE CHANGE ================= */

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const remaining = MAX_IMAGES - (place?.images?.length || 0);

    if (files.length > remaining) {
      alert(`Only ${remaining} more images allowed`);
      return;
    }

    setNewImages(files);
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    newImages.forEach((img) => payload.append("images", img));

    try {
      startLoading();
      const res = await FetchData(
        `places/update/${placeId}`,
        "post",
        payload,
        true,
      );

      if (res.data.success) {
        setSuccess("Place updated successfully");
      }
    } catch (err) {
      setError("Update failed");
    } finally {
      stopLoading();
    }
  };

  /* ================= LOADING GUARDS ================= */

  if (!user) return <div>Restricted Access</div>;
  if (!formData) return <div>Loading...</div>;

  /* ================= UI ================= */

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Place</h1>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      {/* EXISTING IMAGES */}
      <div className="grid grid-cols-5 gap-3">
        {place?.images?.map((img) => (
          <img
            key={img.fileId}
            src={img.url}
            className="h-24 w-full object-cover rounded"
          />
        ))}
      </div>

      {/* ADD IMAGES */}
      {place?.images?.length < MAX_IMAGES && (
        <input type="file" multiple onChange={handleImageChange} />
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputBox
          Name="name"
          LabelName="Place Name"
          Value={formData.name}
          onChange={handleChange}
        />

        <InputBox
          Name="category"
          LabelName="Category"
          Value={formData.category}
          onChange={handleChange}
        />

        <InputBox
          Name="averageTimeSpent"
          LabelName="Average Time Spent"
          Type="number"
          Value={formData.averageTimeSpent}
          onChange={handleChange}
        />

        <InputBox
          Name="entryFee"
          LabelName="Entry Fee"
          Type="number"
          Value={formData.entryFee}
          onChange={handleChange}
        />

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <Button label="Update Place" type="submit" />
      </form>
    </div>
  );
};

export default LoadingUI(EditPlace);
