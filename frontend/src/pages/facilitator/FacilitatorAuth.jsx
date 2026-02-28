import React, { useState } from "react";
import FacilitatorRegister from "./FacilitatorRegister";
import FacilitatorLogin from "./FacilitatorLogin";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const FacilitatorAuth = () => {
  const [loginComp, setLoginComp] = useState(true);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className={`flex justify-center items-center px-4 w-full`}>
      <div className={`shadow-xl rounded-2xl md:w-[80vw] p-6 `}>
        {/* Toggle Buttons */}
        <div className="flex mb-6 rounded-xl overflow-hidden">
          <button
            onClick={() => setLoginComp(true)}
            className={`flex-1 py-2 text-sm font-semibold transition ${
              loginComp ? "bg-[#FFC20E]" : "bg-gray-100 text-gray-700"
            }`}
          >
            Facilitator Register
          </button>
          <button
            onClick={() => setLoginComp(false)}
            className={`flex-1 py-2 text-sm font-semibold transition ${
              !loginComp ? "bg-[#FFC20E]" : "bg-gray-100 text-gray-700"
            }`}
          >
            Facilitator Login
          </button>
        </div>

        {/* Animated Form */}
        <AnimatePresence mode="wait">
          <motion.div
            key={loginComp}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="w-full flex justify-center items-center"
          >
            {loginComp ? <FacilitatorRegister /> : <FacilitatorLogin />}
            {/* {loginComp ? <FacilitatorLogin /> : <FacilitatorRegister />} */}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FacilitatorAuth;
