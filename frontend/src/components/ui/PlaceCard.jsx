import { BiSolidNavigation } from "react-icons/bi";
import { Link } from "react-router-dom";

const PlaceCard = ({ place }) => {
  return (
    <Link
      to={`/current/place/${place?._id}`}
      className="
        w-full 
        bg-white 
        border border-gray-200 
        rounded-xl 
        shadow-sm 
        hover:shadow-md 
        transition
        lg:w-1/2
        lg:flex
        overflow-hidden
      "
    >
      {/* Image / Placeholder */}
      <div className="h-40 w-full bg-gray-100 flex items-center justify-center lg:h-auto lg:w-1/2">
        <span className="text-gray-400 text-sm">No Image</span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between lg:w-1/2">
        <div className="space-y-2">
          {/* Name */}
          <h3 className="text-xl font-semibold text-gray-900">{place?.name}</h3>

          {/* Location */}
          <p className="text-sm text-gray-500">
            {place?.city?.name}, {place?.state?.name}
          </p>

          {/* Category */}
          <span className="inline-block w-fit text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
            {place?.category}
          </span>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {place?.description}
          </p>
        </div>

        {/* Meta Info */}
        <div className="flex justify-between text-sm text-gray-500 pt-4">
          <span>⏱ {place?.averageTimeSpent} min</span>
          <span> ₹{place?.entryFee}</span>
        </div>
      </div>
    </Link>
  );
};
const ExpandedPlaceCard = ({ place }) => {
  const lat = place?.location?.coordinates[1];
  const long = place?.location?.coordinates[0];
  const openMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`;
    window.open(url, "_blank");
  };
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
      {/* Image / Placeholder */}
      <div className="h-[400px] w-full bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400 text-sm">No Image</span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-row justify-between">
        <div className="space-y-2">
          {/* Name */}
          <h3 className="text-xl font-semibold text-gray-900">{place?.name}</h3>

          {/* Location */}
          <p className="text-sm text-gray-500">
            {place?.city?.name}, {place?.state?.name}
          </p>

          {/* Category */}
          <span className="inline-block w-fit text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
            {place?.category}
          </span>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {place?.description}
          </p>
        </div>

        {/* Meta Info */}
        <button
          onClick={openMaps}
          className={`bg-transparent px-4 py-2 rounded-2xl drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl transition duration-150 ease-in-out hover:text-[#DF3F33] border h-full flex flex-col justify-center items-center text-neutral-500`}
        >
          <span>
            <BiSolidNavigation className="text-3xl" />
          </span>
          <span className="">Get Directions</span>
        </button>
      </div>
      <div className="flex justify-between text-sm text-gray-500 px-5 pb-5">
        <span>⏱ {place?.averageTimeSpent} min</span>
        <span> ₹{place?.entryFee}</span>
      </div>
    </div>
  );
};

export { PlaceCard, ExpandedPlaceCard };
