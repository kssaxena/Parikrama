import React, { useState, useEffect } from "react";
import { FetchData } from "../../utils/FetchFromApi";
import LoadingUI from "../../components/LoadingUI";

const HowThisSiteWork = ({ startLoading, stopLoading }) => {
  // must be object (not array)
  const [data, setData] = useState({
    description: "",
    points: [],
  });

  const fetchCMS = async () => {
    try {
      startLoading();

      const res = await FetchData("cms", "get");

      setData(
        res?.data?.data?.howThisSiteWork || {
          description: "",
          points: [],
        },
      );
    } catch (err) {
      //   console.log(err);
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchCMS();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">How this site works..</h1>

      {/* DESCRIPTION */}
      {data?.description && <p className="text-gray-700">{data.description}</p>}

      {/* POINTS */}
      {data?.points?.length > 0 ? (
        <ul className="list-disc pl-6 space-y-2">
          {data.points.map((point, index) => (
            <li key={index} className="text-gray-600">
              {point}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No data available</p>
      )}
    </div>
  );
};

export default LoadingUI(HowThisSiteWork);
