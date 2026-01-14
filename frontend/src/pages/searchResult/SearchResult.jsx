import React from "react";
import { useState } from "react";
import { FetchData } from "../../utils/FetchFromApi";
import Button from "../../components/Button";

const SearchResult = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      //   const response = await FetchData("admin/states", "get");
      const response = await FetchData("admin/cities", "get");
      //   const response = await FetchData("admin/places", "get");
      console.log(response);
      setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Button label={"GetData"} onClick={() => getData()} />
      <h1>
        {data?.map((value) => {
          return (
            <div className="flex justify-start items-center gap-10">
              <span>{value.name}</span>
              <span>{value._id}</span>
            </div>
          );
        })}
      </h1>
    </div>
  );
};

export default SearchResult;
