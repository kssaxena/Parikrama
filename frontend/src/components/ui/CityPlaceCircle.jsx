// import React, { useState } from "react";
// import { FaHeart, FaMapMarkerAlt } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { getDistanceKm } from "../../utils/DistanceCalculator";

// const MobileMarker = ({ place, x, y, cityLat, cityLong }) => {
//   const [show, setShow] = useState(false);
//   const placeLat = place?.location?.coordinates?.[1];
//   const placeLong = place?.location?.coordinates?.[0];

//   const distance =
//     cityLat && cityLong && placeLat && placeLong
//       ? getDistanceKm(cityLat, cityLong, placeLat, placeLong).toFixed(1)
//       : null;

//   return (
//     <div
//       className={`absolute group hover:z-50 ${show ? "z-50" : "z-30"}`}
//       style={{ transform: `translate(${x}px, ${y}px)` }}
//     >
//       {/* DASHED LINE */}
//       <div
//         className={`absolute top-1/2 right-1/2 origin-right border-t group-hover:border-none border-gray-900 group-hover:z-0 ${show ? "border-none" : "border-dashed"}`}
//         style={{
//           width: Math.sqrt(x * x + y * y),
//           transform: `rotate(${Math.atan2(y, x)}rad)`,
//         }}
//       />

//       {/* ICON */}
//       <Link
//         to={`/current/place/${place?._id}`}
//         onClick={(e) => {
//           if (!show) {
//             e.preventDefault();
//             setShow(true);
//             setTimeout(() => setShow(false), 2500);
//           }
//         }}
//         className="relative z-1 text-2xl cursor-pointer"
//       >
//         <FaMapMarkerAlt />
//       </Link>

//       {/* TOOLTIP */}
//       <div
//         className={`
//     absolute
//     left-1/2
//     -translate-x-1/2
//     bottom-5
//     bg-black
//     text-white
//     px-3
//     py-1
//     rounded
//     whitespace-nowrap
//     z-[9999]   /* 👈 CHANGE ONLY THIS */
//     pointer-events-none
//     transition
//     ${show ? "opacity-100 z-9999 absolute" : "opacity-0"}
//     group-hover:opacity-100
//   `}
//       >
//         <div className="w-24 h-24  bg-red-400">
//           <img
//             src={place?.images[0]?.url}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <div className="text-sm font-medium">{place.name}</div>
//         {distance && (
//           <div className="text-xs text-gray-300">{distance} km away</div>
//         )}
//       </div>
//     </div>
//   );
// };

// const CityPlacesCircle = ({ cityName, places = [], cityLong, cityLat }) => {
//   const radius = 150; // distance from center
//   const centerSize = 130;

//   return (
//     <div className="relative md:w-[400px] w-full h-[400px] md:mx-auto flex items-center justify-center bg-gray-200 rounded-xl shadow">
//       {/* CENTER CIRCLE */}
//       <div
//         // className="absolute flex items-center justify-center rounded-full bg-[#FFC20E] font-semibold text-lg shadow-lg z-50 flex-col"
//         className={`relative flex items-center justify-center rounded-full bg-[#FFC20E] font-semibold text-lg shadow-lg z-40 flex-col `}
//         style={{ width: centerSize, height: centerSize }}
//       >
//         <div className="relative group flex justify-center items-center gap-2">
//           <span>I</span>

//           <FaHeart className="text-red-500 cursor-pointer" />

//           {/* TOOLTIP */}
//           <div
//             className="
//       absolute
//       bottom-full
//       mb-2
//       left-1/2
//       -translate-x-1/2
//       bg-black
//       text-white
//       text-xs
//       px-3
//       py-1
//       rounded
//       whitespace-nowrap
//       opacity-0
//       group-hover:opacity-100
//       transition
//       z-[9999]
//     "
//           >
//             We are showing the distance from the heart of the city
//           </div>
//         </div>
//         <span
//           className={`${cityName?.length > 18 ? "text-[11px]" : cityName?.length > 12 ? "text-xs" : "text-sm md:text-base"}`}
//         >
//           {cityName}
//         </span>
//       </div>

//       {/* PLACES AROUND CIRCLE */}
//       {places.map((place, index) => {
//         const angle = (2 * Math.PI * index) / places.length;
//         const x = radius * Math.cos(angle);
//         const y = radius * Math.sin(angle);

//         return (
//           <MobileMarker
//             key={place._id || index}
//             place={place}
//             x={x}
//             y={y}
//             cityLat={cityLat}
//             cityLong={cityLong}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default CityPlacesCircle;

import React, { useState } from "react";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaArrowRight,
  FaLocationArrow,
} from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getDistanceKm } from "../../utils/DistanceCalculator";

const CityPlacesCircle = ({ cityName, places = [], cityLat, cityLong }) => {
  const [selectedPlace, setSelectedPlace] = useState(places?.[0]);

  const radius = 150;

  return (
    <div
      className="
        relative
        w-full
        h-[500px]
        overflow-hidden
        rounded-[40px]
        bg-[#f5f5f7]
        flex
        items-center
        justify-center
      "
    >
      {/* SIDE CARD */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div
            layout
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="
            absolute
            left-10
            top-1/2
            -translate-y-1/2
            w-[320px]
            bg-white
            rounded-[30px]
            shadow-2xl
            overflow-hidden
            z-50
          "
          >
            <div className="relative h-[120px]">
              <img
                src={selectedPlace?.images?.[0]?.url}
                className="w-full h-full object-cover"
              />

              <button
                onClick={() => setSelectedPlace(false)}
                className="
                absolute
                top-4
                right-4
                w-8
                h-8
                rounded-full
                bg-white
                shadow-lg
                flex
                items-center
                justify-center
              "
              >
                <FaHeart className="text-red-500" />
              </button>
            </div>

            <div className="p-3">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedPlace?.name}
              </h2>

              <div className="flex items-center gap-2 mt-3 text-gray-500">
                <FaLocationArrow className="text-[#FFC20E]" />

                <span className="text-lg">
                  {getDistanceKm(
                    cityLat,
                    cityLong,
                    selectedPlace?.location?.coordinates?.[1],
                    selectedPlace?.location?.coordinates?.[0],
                  ).toFixed(1)}{" "}
                  km away
                </span>
              </div>

              <Link
                onClick={() => setSelectedPlace(false)}
                to={`/current/place/${selectedPlace?._id}`}
                className="
              text-xs
                flex
                items-center
                justify-center
                gap-3
                bg-[#FFC20E]
                py-4
                rounded-2xl
                font-semibold
              "
              >
                View Details
                <FaArrowRight />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CENTER CIRCLE */}
      <div
        className="
          relative
          w-[110px]
          h-[110px]
          rounded-full
          bg-[#FFC20E]
          shadow-[0_20px_60px_rgba(255,193,7,0.35)]
          flex
          flex-col
          items-center
          justify-center
          z-40
        "
      >
        <div className="flex items-center gap-3">
          <span className="text-xl font-semibold">I</span>

          <FaHeart className="text-red-500 text-xl" />
        </div>

        <h2
          className={`text-xl font-bold mt-2 ${cityName?.length > 18 ? "text-[10px]" : cityName?.length > 12 ? "text-xs" : "text-sm md:text-base"}`}
        >
          {cityName}
        </h2>
      </div>

      {/* OUTER RINGS */}
      <div className="absolute w-[400px] h-[400px] rounded-full border border-gray-400 opacity-30" />

      <div className="absolute w-[500px] h-[500px] rounded-full border border-gray-600 opacity-20" />

      {/* MARKERS */}
      {places.map((place, index) => {
        const angle = (2 * Math.PI * index) / places.length;

        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        const distance = getDistanceKm(
          cityLat,
          cityLong,
          place?.location?.coordinates?.[1],
          place?.location?.coordinates?.[0],
        ).toFixed(1);

        return (
          <div
            key={place?._id}
            className="absolute"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            {/* CONNECTOR */}
            <div
              className="
                absolute
                top-1/2
                right-1/2
                origin-right
                border-t
                border-dashed
                border-gray-400
              "
              style={{
                width: Math.sqrt(x * x + y * y),
                transform: `rotate(${Math.atan2(y, x)}rad)`,
              }}
            />

            {/* MARKER BUTTON */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              onClick={() => setSelectedPlace(place)}
              className="
                relative
                z-20
                w-10
                h-10
                rounded-full
                bg-white
                shadow-xl
                flex
                flex-col
                items-center
                justify-center
                border
                border-gray-100
              "
            >
              <FaMapMarkerAlt className="text-[#FFC20E] text-2xl" />
            </motion.button>
          </div>
        );
      })}
    </div>
  );
};

export default CityPlacesCircle;
