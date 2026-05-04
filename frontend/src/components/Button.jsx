import React from "react";

const Button = ({
  onClick,
  className,
  className2 = "",
  label,
  type,
  Disabled,
  normal = true,
}) => {
  const normalButton =
    "bg-[#FFC20E] px-4 py-2 rounded-2xl hover:scale-105 hover:drop-shadow-2xl transition duration-150 ease-in-out";
  const secondaryButton = `bg-[#F17223] rounded-2xl hover:scale-105 hover:drop-shadow-2xl transition duration-150 ease-in-out ${className2}`;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={Disabled}
      className={`${normal === true ? normalButton : secondaryButton} ${className} `}
      // className={`bg-[#DF3F33] px-4 py-2 rounded-2xl drop-shadow-xl hover:scale-105 hover:drop-shadow-2xl transition duration-150 ease-in-out ${className} text-white `}
    >
      {label}
    </button>
  );
};

export default Button;
