import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";
import LoadingUI from "../../components/LoadingUI";
import { FetchData } from "../../utils/FetchFromApi";

const FacilitatorRegister = ({ startLoading, stopLoading }) => {
  const formRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(formRef.current);
    const payload = Object.fromEntries(formData.entries());

    try {
      startLoading();
      const res = await FetchData("facilitator/register", "post", payload);

      if (res.data.success) {
        navigate("/facilitator/login");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl w-full"
      >
        <h2 className="text-2xl font-bold mb-6">Facilitator Registration</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="grid md:grid-cols-2 grid-rows-2 md:gap-2">
          <InputBox LabelName="Full Name" Name="name" required />
          <InputBox LabelName="Phone" Name="phone" required />
          <InputBox LabelName="Email (optional)" Name="email" />
          <InputBox
            LabelName="Password"
            Name="password"
            Type="password"
            required
          />

          <InputBox
            LabelName="Role"
            Name="role"
            Placeholder="Guide / Pandit / Instructor"
            required
          />

          <InputBox LabelName="Place ID" Name="place" required />
          <InputBox LabelName="City ID" Name="city" required />
          <InputBox LabelName="State ID" Name="state" required />
        </div>

        <Button label="Register" type="submit" className="w-full mt-4" />
      </form>
    </div>
  );
};

export default LoadingUI(FacilitatorRegister);
