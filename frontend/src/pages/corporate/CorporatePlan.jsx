import React, { useRef, useState } from "react";
import {
  FaPlaneDeparture,
  FaHotel,
  FaPassport,
  FaBus,
  FaTrain,
  FaGlobeAsia,
  FaArrowRight,
  FaCheckCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { HiDownload } from "react-icons/hi";

import {
  services,
  whyChooseUs,
  paymentModels,
  corporateEnquiryForm,
} from "../../constants/Constants";
import { motion, AnimatePresence } from "framer-motion";
import { FetchData } from "../../utils/FetchFromApi";
import { parseErrorMessage } from "../../utils/ErrorMessageParser";
import InputBox from "../../components/InputBox";
import Button from "../../components/Button";

const iconMap = {
  plane: <FaPlaneDeparture />,
  hotel: <FaHotel />,
  visa: <FaPassport />,
  bus: <FaBus />,
  train: <FaTrain />,
  globe: <FaGlobeAsia />,
};

const CorporatePlan = () => {
  const formRef = useRef();
  const [popup, setPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(formRef.current);
      const response = await FetchData(
        "enquiry/guest/corporate/create-enquiry",
        "post",
        formData,
      );
      alert(response.data.message);
      formRef.current.reset();
      setPopup(false);
    } catch (err) {
      alert(parseErrorMessage(err.response.data));
    }
  };

  return (
    <div className="w-full bg-white text-black overflow-hidden">
      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-20 relative">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#FFC20D]/20 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FFC20D]/10 blur-3xl rounded-full" />

        <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-8 animate-fadeIn">
            <div className="inline-flex items-center gap-3 bg-[#FFC20D]/10 px-5 py-2 rounded-full">
              <div className="w-3 h-3 bg-[#FFC20D] rounded-full animate-pulse" />
              <p className="font-medium text-sm">Corporate Travel Solutions</p>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              Travel
              <span className="text-[#FFC20D]"> Smarter </span>
              With
              <br />
              Parikrama
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Seamless domestic & international travel management with complete
              booking support, hotel arrangements, visa assistance and dedicated
              corporate coordination.
            </p>

            <div className="flex flex-wrap gap-5">
              <button
                onClick={() => setPopup(true)}
                className="bg-[#FFC20D] hover:scale-105 transition-all duration-300 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-xl"
              >
                Get Started
                <FaArrowRight />
              </button>

              <a
                href="https://ik.imagekit.io/parikrama/Parikrama%20Corp.pdf.pdf"
                target="blank"
                className="border-2 border-[#FFC20D] hover:bg-[#FFC20D] transition-all duration-300 px-8 py-4 rounded-2xl font-bold flex justify-between items-center gap-3"
              >
                <HiDownload /> Our full plan
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="bg-[#FFC20D] rounded-[40px] p-10 rotate-3 shadow-2xl">
              <div className="bg-white rounded-[30px] p-10 -rotate-3">
                <h2 className="text-3xl font-black mb-10">
                  Why Companies Choose Us
                </h2>

                <div className="space-y-6">
                  {whyChooseUs.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 hover:translate-x-2 transition-all duration-300"
                    >
                      <div className="mt-1 text-[#FFC20D] text-xl">
                        <FaCheckCircle />
                      </div>

                      <p className="text-gray-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-28 px-6 lg:px-20 bg-[#FFF9E6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6">
              Our <span className="text-[#FFC20D]">Services</span>
            </h2>

            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Complete end-to-end corporate travel solutions tailored for modern
              businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-[30px] p-8 shadow-lg hover:-translate-y-3 transition-all duration-500 border border-transparent hover:border-[#FFC20D]"
              >
                <div className="w-20 h-20 rounded-3xl bg-[#FFC20D] flex items-center justify-center text-3xl mb-8">
                  {iconMap[service.icon]}
                </div>

                <h3 className="text-2xl font-black mb-4">{service.title}</h3>

                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENT MODELS */}
      <section className="py-28 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black mb-6">
              Flexible
              <span className="text-[#FFC20D]"> Payment Models</span>
            </h2>

            <p className="text-gray-600 text-lg">
              Choose the model that suits your organization best.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {paymentModels.map((model, index) => (
              <div
                key={index}
                className="relative bg-white rounded-[35px] border-2 border-[#FFC20D] overflow-hidden hover:scale-[1.02] transition-all duration-500 shadow-xl"
              >
                <div className="bg-[#FFC20D] p-8">
                  <h3 className="text-3xl font-black">{model.title}</h3>

                  <p className="mt-3 font-medium">{model.subtitle}</p>
                </div>

                <div className="p-8">
                  <ul className="space-y-5">
                    {model.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-4">
                        <span className="text-[#FFC20D] mt-1">
                          <FaCheckCircle />
                        </span>

                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-28 px-6 lg:px-20 bg-[#FFC20D]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl font-black mb-8">
            Let’s Build Your Corporate Travel Experience
          </h2>

          <p className="text-xl mb-16">
            Dedicated support, seamless bookings and personalized travel
            management.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-[30px] p-8 shadow-lg">
              <FaPhoneAlt className="text-4xl mx-auto mb-5" />
              <h3 className="font-black text-xl mb-3">Call Us</h3>
              <p>+91 9599350524</p>
            </div>

            <div className="bg-white rounded-[30px] p-8 shadow-lg">
              <FaEnvelope className="text-4xl mx-auto mb-5" />
              <h3 className="font-black text-xl mb-3">Email</h3>
              <p>connect@parikramaglobal.com</p>
            </div>

            <div className="bg-white rounded-[30px] p-8 shadow-lg">
              <FaMapMarkerAlt className="text-4xl mx-auto mb-5" />
              <h3 className="font-black text-xl mb-3">Address</h3>
              <p>C-25, Sector 58, Noida</p>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {popup && (
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-screen w-full flex justify-center items-start md:items-center z-50 bg-black/80 overflow-scroll p-4"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2  gap-1 md:gap-4 bg-white w-full md:w-1/2 p-5 rounded-xl "
            >
              {corporateEnquiryForm.map((i) => (
                <InputBox
                  LabelName={i.label}
                  Name={i.name}
                  Placeholder={i.placeHolder}
                  Type={i.placeHolder}
                />
              ))}
              <input
                name="enquiryType"
                value="CorporateEnquiry"
                className="hidden"
                type="text"
              />
              <div className="flex justify-center items-center w-full md:col-span-2">
                <div className="py-4 w-full">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comments
                  </label>
                  <textarea
                    placeholder="Write a short description about your help..."
                    name="comments"
                    rows="6"
                    className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:ring-[#FFC20E] focus:border-[#FFC20E] outline-none transition duration-200 ease-in-out hover:shadow-md"
                  />
                </div>
              </div>
              <Button
                label={"Cancel"}
                type={"reset"}
                className={"w-full"}
                onClick={() => {
                  formRef.current.reset();
                  setPopup(false);
                }}
              />
              <Button label={"Submit"} type={"submit"} className={"w-full"} />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CorporatePlan;
