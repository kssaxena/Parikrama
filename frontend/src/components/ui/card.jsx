import React from "react";
import { BiSolidNavigation } from "react-icons/bi";
import Button from "../../components/Button";
import { truncateString } from "../../utils/Utility-functions";
import { Link } from "react-router-dom";

const Card = ({
  name,
  city,
  state,
  category,
  description,
  lat,
  long,
  placeId,
}) => {
  const openMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`;
    window.open(url, "_blank");
  };
  return (
    <Link
      to={`/current/place/${placeId}`}
      className="bg-neutral-100 w-full px-10 py-5 flex justify-between items-center rounded-xl hover:shadow-xl duration-3000 ease-in-out"
    >
      <div>
        <h1 className="text-xl tracking-wide uppercase">{name}</h1>
        <h2 className="text-xs">
          <span>{city}</span>,<span>{state}</span>
        </h2>
        <h1 className="inline-block w-fit text-xs px-3 py-1 rounded-full bg-[#FFC20E]">
          {/* <strong>Category: </strong> */}
          {category}
        </h1>
        <h1 className="text-xs">{truncateString(description, 50)}</h1>
      </div>
      <div>
        <button
          onClick={openMaps}
          className={`bg-transparent px-4 py-2 rounded-2xl drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl transition duration-150 ease-in-out hover:text-[#FFC20E] border h-full flex flex-col justify-center items-center text-neutral-500`}
        >
          <span>
            <BiSolidNavigation className="text-3xl" />
          </span>
          <span className="text-black">Get Directions</span>
        </button>
      </div>
    </Link>
  );
};

export default Card;
