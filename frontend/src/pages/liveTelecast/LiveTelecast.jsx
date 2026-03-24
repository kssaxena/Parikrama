import React, { useEffect, useRef, useState } from "react";
import LoadingUI from "../../components/LoadingUI";
import { FetchData } from "../../utils/FetchFromApi";
import { truncateString } from "../../utils/Utility-functions";
import { TbLivePhotoFilled } from "react-icons/tb";
import Button from "../../components/Button";
import { motion, AnimatePresence } from "framer-motion";
import YoutubePlayer from "../../utils/YoutubePlayer";
import { useNavigate } from "react-router-dom";
import InputBox from "../../components/InputBox";
import { formatProdErrorMessage } from "@reduxjs/toolkit";

const Card = ({
  name,
  city,
  state,
  category,
  description,
  placeId,
  image,
  telecastLink,
}) => {
  const formRef = useRef();
  const [modelTelecast, openModelTelecast] = useState(false);
  const [modelOTP, openModelOTP] = useState(false);
  const [otp, setOtp] = useState();
  const openTelecast = () => {
    const url = telecastLink;
    window.open(url, "_blank");
  };
  const navigate = useNavigate();

  const handleUser = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(formRef.current);
      const response = await FetchData("", "post", formData);
      console.log(response);
      setOtp(response.data.otp);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOtp = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(formRef.current);
      const response = await FetchData("", "post", formData);
      console.log(response);
      openModelTelecast(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      // to={`/current/place/${placeId}`}
      className="bg-neutral-100 w-full md:px-10 px-1 py-2 flex justify-between items-center rounded-xl hover:shadow-xl duration-300 ease-in-out"
    >
      <div className="h-full flex flex-col items-start gap-2">
        <h1 className="md:text-xl text-base md:tracking-wide uppercase">
          {name}
        </h1>
        <h2 className="text-xs">
          <span>{city}</span>, <span>{state}</span>
        </h2>
        <h1 className="inline-block w-fit text-xs px-2 py-1 rounded-full bg-[#FFC20E]">
          {category}
        </h1>
        <h1 className="text-xs hidden md:block">
          {truncateString(description, 200)}
        </h1>
        <Button
          label={"Visit Place"}
          className={"text-xs"}
          onClick={() => navigate(`/current/place/${placeId}`)}
        />
      </div>
      <div className="flex justify-center items-end flex-col gap-3 md:w-96">
        <div className="h-28 w-32 bg-neutral-200 flex justify-center items-center rounded-xl overflow-hidden">
          <img
            src={image}
            alt="No image found"
            className="object-cover object-center rounded-xl w-full h-full"
          />
        </div>
        <Button
          onClick={() => openModelOTP(true)}
          label={
            <h1 className="flex justify-center items-center md:gap-5 text-xs md:text-base">
              Live Telecast
              <span>
                <TbLivePhotoFilled className="text-red-700" />
              </span>
            </h1>
          }
        />
      </div>
      <AnimatePresence>
        {modelOTP && (
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-screen w-full flex justify-center items-center flex-col z-50 bg-black/90 overflow-scroll no-scrollbar"
          >
            <div className="bg-white rounded-xl flex justify-center items-center flex-col md:p-10 gap-5">
              <h1>Login first for viewing the live telecast</h1>
              <form ref={formRef} onSubmit={handleUser}>
                <InputBox
                  LabelName="Enter your mobile number"
                  Name="contactNumber"
                  Placeholder="Enter contact number"
                  Type="number"
                />
                {otp ? (
                  <div>
                    <InputBox LabelName="Enter OTP" />
                    <Button label={"Confirm"} onClick={() => handleOtp()} />
                  </div>
                ) : (
                  <Button label={"Submit"} />
                )}
              </form>
            </div>
          </motion.div>
        )}
        {modelTelecast && (
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-screen w-full flex justify-center items-center flex-col z-50 bg-black/90 overflow-scroll no-scrollbar"
          >
            <div className="w-full md:w-[80vw] h-full md:h-[80vh] bg-black/50 rounded-xl flex justify-center items-center flex-col md:p-10 gap-5">
              <YoutubePlayer url={telecastLink} />
              <div className="flex justify-center items-center w-full gap-10">
                <Button
                  label={"Close"}
                  onClick={() => openModel(false)}
                  className={"text-xs md:text-base"}
                />
                <Button
                  onClick={openTelecast}
                  label={
                    <h1 className="flex justify-center items-center md:gap-5 text-xs md:text-base">
                      Live Telecast
                      <span>
                        <TbLivePhotoFilled className="text-red-700" />
                      </span>
                    </h1>
                  }
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LiveTelecast = ({ stopLoading, startLoading }) => {
  const [data, setData] = useState([]);
  const banner = async () => {
    try {
      startLoading();
      const response = await FetchData("promotions/get/all/promotions", "get");
      setData(response.data.data.telecastPlace);
    } catch (err) {
      console.log(err);
    } finally {
      stopLoading();
    }
  };
  useEffect(() => {
    banner();
  }, []);

  return (
    <div className="flex justify-start items-center flex-col w-full md:py-10 py-2">
      <h1 className="text-2xl font-semibold ">Live Telecast</h1>
      <div className="flex justify-center items-center flex-col gap-5 md:w-[70vw] w-[95vw]">
        {data ? (
          data?.map((place) => (
            <Card
              key={place._id}
              placeId={place._id}
              name={place.name}
              city={place?.city?.name}
              state={place?.state?.name}
              category={place?.category}
              description={place?.description}
              image={place?.images?.[0]?.url}
              telecastLink={place?.telecastLink}
            />
          ))
        ) : (
          <h1>No data currently available for live telecast</h1>
        )}
      </div>
    </div>
  );
};

export default LoadingUI(LiveTelecast);
