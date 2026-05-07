import React from "react";
import InputBox from "../InputBox";
import { useState } from "react";
import Button from "../Button";
import { useRef } from "react";
import { FetchData } from "../../utils/FetchFromApi";
import LoadingUI from "../LoadingUI";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewState = ({ startLoading, stopLoading }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [states, setStates] = useState([]);
  const formRef = useRef();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        startLoading();
        const res = await FetchData("country/get/all-country", "get");
        console.log(res);
        setCountries(res?.data?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        stopLoading();
      }
    };
    fetchCountries();
  }, []);

  const addNewState = async (e) => {
    e.preventDefault();
    try {
      startLoading();
      const formData = new FormData(formRef.current);
      const response = await FetchData(
        "states/add/new/state",
        "post",
        formData,
      );
      setSuccess(response.data.data.message);
      formRef.current.reset();
      navigate("/admin/dashboard");
    } catch (err) {
      console.log(err);
      setError(err.response.data.message || "Something went wrong");
    } finally {
      stopLoading();
    }
  };

  return localStorage.role === "admin" || localStorage.role === "Admin" ? (
    <div className="w-full ">
      <form ref={formRef} onSubmit={addNewState} className="py-10">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div>
          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <select
              name="country"
              required
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-[#FFC20E] focus:border-[#FFC20E] outline-none transition duration-200 ease-in-out hover:shadow-md"
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              {countries?.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <InputBox
            Placeholder="State name"
            LabelName="State Name"
            Name="name"
          />
          <InputBox
            Placeholder="Eg: MP, RJ, etc"
            LabelName="State Code"
            Name="code"
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <Button
            label={"Cancel"}
            onClick={() => {
              formRef.current.reset();
              navigate("/admin/dashboard");
            }}
          />
          <Button label={"Submit"} type={"submit"} />
        </div>
      </form>
      {/* {states?.length === 36 ? (
        ""
      ) : (
      )} */}

      {/* {states?.length === 36 ? (
        <div className="flex flex-wrap">
          <h1 className="font-semibold">
            All {states?.length} states are listed you cannot add more !
          </h1>
          <div className="flex flex-wrap">
            {states?.map((state) => (
              <h1 className="bg-neutral-200 px-2 py-1 mx-1 my-1 rounded-full">
                {state.name}
              </h1>
            ))}
          </div>
        </div>
      ) : (
        ""
      )} */}
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

export default LoadingUI(NewState);
