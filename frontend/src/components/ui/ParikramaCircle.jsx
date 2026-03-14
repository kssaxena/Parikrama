// import React from "react";
// import logo from "../../assets/Logo1.png";
// import { Link } from "react-router-dom";

// const ParikramaCircle = () => {
//   const radius = 120;
//   const centerSize = 100;

//   const items = [
//     { title: "Register as Facilitator", url: "/login/facilitator" },
//     { title: "Book a Facilitator", url: "/" },
//     { title: "Explore Places", url: "/explore" },
//     { title: "Book Flight Tickets", url: "/flights-busses" },
//     { title: "Book Bus Tickets", url: "/flights-busses" },
//     { title: "Travel package", url: "/travel-packages" },
//   ];

//   return (
//     <div className="relative md:w-[400px] w-full h-[300px] mx-auto flex items-center justify-center bg-gray-200 rounded-xl shadow text-xs">
//       {/* ===== CENTER CIRCLE ===== */}
//       <div
//         className="absolute flex items-center justify-center flex-col rounded-full bg-[#FFC20E] font-semibold shadow-lg z-20 text-center px-4"
//         style={{ width: centerSize, height: centerSize }}
//       >
//         <img src={logo} className="w-10 h-10" />
//         Parikrama
//       </div>

//       {/* ===== RADIAL ITEMS ===== */}
//       {items.map((item, index) => {
//         const angle = (2 * Math.PI * index) / items.length;

//         const x = radius * Math.cos(angle);
//         const y = radius * Math.sin(angle);

//         const lineLength = Math.sqrt(x * x + y * y);

//         return (
//           <div
//             key={index}
//             className="absolute flex flex-col items-center"
//             style={{
//               transform: `translate(${x}px, ${y}px)`,
//             }}
//           >
//             {/* dashed line */}
//             <div
//               className="absolute top-1/2 right-1/2 origin-right border-t border-dashed border-gray-500"
//               style={{
//                 width: lineLength,
//                 transform: `rotate(${Math.atan2(y, x)}rad)`,
//               }}
//             />

//             {/* item card */}
//             <Link
//               to={item.url}
//               className="relative bg-black text-white rounded shadow text-xs text-center p-1"
//             >
//               {item.title}
//             </Link>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default ParikramaCircle;

import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo1.png";

const ParikramaCircle = () => {
  // responsive circle size
  const size = Math.min(window.innerWidth * 0.9, 390);

  const center = size / 2;
  const radius = size * 0.32;
  const centerCircle = size * 0.25;

  const items = [
    {
      title: "Register as Facilitator",
      url: "/login/facilitator",
    },
    { title: "Book Bus Tickets", url: "/flights-busses" },
    { title: "Explore Places", url: "/explore" },
    { title: "Travel package", url: "/travel-packages" },
    { title: "Book a Facilitator", url: "/" },
    { title: "Book Flight Tickets", url: "/flights-busses" },
  ];

  return (
    <div className="flex justify-center items-center py-10 px-4">
      <div
        className="relative rounded-full bg-white shadow-xl border border-black/5"
        style={{ width: size, height: size }}
      >
        {/* Center Logo */}
        <div
          className="absolute rounded-full flex flex-col items-center justify-center bg-[#FFC20E] text-white z-20 shadow-lg"
          style={{
            width: centerCircle,
            height: centerCircle,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <img src={logo} className="w-9 h-9" />
          {/* <p className="uppercase text-black text-xs font-semibold">
            Parikrama
          </p> */}
        </div>

        {/* Divider Lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-black/10"
            style={{
              width: 2,
              height: "100%",
              left: "50%",
              top: 0,
              transform: `rotate(${i * 60}deg)`,
              transformOrigin: "center",
            }}
          />
        ))}

        {/* Items */}
        {items.map((item, i) => {
          const angle = (i * 360) / items.length;
          const rad = (angle * Math.PI) / 180;

          const x = center + radius * Math.cos(rad) - 60;
          const y = center + radius * Math.sin(rad) - 15;

          return (
            <Link
              key={i}
              to={item.url}
              className="absolute text-xs hover:bg-[#FFC20E] text-center p-2 rounded-md hover:shadow-2xl shadow-black hover:scale-105 duration-300 ease-in-out"
              style={{
                left: x,
                top: y,
              }}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ParikramaCircle;
