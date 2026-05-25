// import React, { useState, useEffect } from "react";
// import { FetchData } from "../../utils/FetchFromApi";
// import LoadingUI from "../../components/LoadingUI";

// const PrivacyPolicy = ({ startLoading, stopLoading }) => {
//   // must be object (not array)
//   const [data, setData] = useState({
//     description: "",
//     points: [],
//   });

//   const fetchCMS = async () => {
//     try {
//       startLoading();

//       const res = await FetchData("cms", "get");

//       setData(
//         res?.data?.data?.privacyPolicy || {
//           description: "",
//           points: [],
//         },
//       );
//     } catch (err) {
//       //   console.log(err);
//     } finally {
//       stopLoading();
//     }
//   };

//   useEffect(() => {
//     fetchCMS();
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">
//       <h1 className="text-3xl font-bold">Privacy Policy</h1>

//       {/* DESCRIPTION */}
//       {data?.description && <p className="text-gray-700">{data.description}</p>}

//       {/* POINTS */}
//       {data?.points?.length > 0 ? (
//         <ul className="list-disc pl-6 space-y-2">
//           {data.points.map((point, index) => (
//             <li key={index} className="text-gray-600">
//               {point}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p className="text-gray-400">No data available</p>
//       )}
//     </div>
//   );
// };

// export default LoadingUI(PrivacyPolicy);

// PrivacyPolicy.jsx

import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 md:px-16 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">PRIVACY POLICY</h1>
        <h2 className="text-xl font-semibold mb-1">
          Parikrama – The Path of Travel
        </h2>
        <p className="mb-8 text-gray-600">A Unit of Anonz Global LLP</p>

        <p className="mb-10 font-medium">Effective Date: 23rd May, 2026</p>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Introduction</h3>
          <p>
            Parikrama – The Path of Travel values user privacy and is committed
            to protecting personal information. This Privacy Policy explains how
            we collect, use, process, store, disclose, and protect user data
            while using our website, mobile applications, booking systems, and
            related services.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Information We Collect
          </h3>

          <p className="font-semibold mb-3">
            We may collect the following information:
          </p>

          <div className="mb-5">
            <h4 className="text-xl font-semibold mb-2">
              Personal Information:
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Mobile number</li>
              <li>Address</li>
              <li>Date of birth</li>
              <li>
                Government identification details (where required for travel
                booking)
              </li>
            </ul>
          </div>

          <div className="mb-5">
            <h4 className="text-xl font-semibold mb-2">Travel Information:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Booking history</li>
              <li>Travel preferences</li>
              <li>Passport details (where applicable)</li>
              <li>Visa-related documents</li>
            </ul>
          </div>

          <div className="mb-5">
            <h4 className="text-xl font-semibold mb-2">
              Technical Information:
            </h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address</li>
              <li>Device information</li>
              <li>Browser type</li>
              <li>Cookies and tracking data</li>
              <li>Website usage analytics</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-2">Payment Information:</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li>Payment transaction references</li>
              <li>Billing details</li>
            </ul>

            <p className="mt-4">
              Sensitive financial data such as card numbers are processed
              securely by authorized payment gateways and are not permanently
              stored on our servers.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Purpose of Data Collection
          </h3>

          <p className="mb-3">We may use user information for:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Booking and travel service fulfillment</li>
            <li>Customer support and communication</li>
            <li>Marketing and promotional campaigns</li>
            <li>Service improvement and analytics</li>
            <li>Fraud prevention and security monitoring</li>
            <li>Compliance with legal obligations</li>
            <li>Personalization of travel recommendations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Cookies & Tracking Technologies
          </h3>

          <p>
            Our platform may use cookies, analytics tools, and tracking
            technologies to improve website functionality, user experience,
            marketing performance, and security.
          </p>

          <p className="mt-4">
            Users may disable cookies through browser settings, although certain
            website features may become limited.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Data Sharing</h3>

          <p className="mb-3">We may share user information with:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Airlines and travel operators</li>
            <li>Hotels and hospitality providers</li>
            <li>Payment gateway providers</li>
            <li>Technology and API partners</li>
            <li>Government or regulatory authorities where legally required</li>
          </ul>

          <p className="mt-4">
            We do not sell sensitive personal information to unauthorized third
            parties.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Data Security</h3>

          <p className="mb-3">
            Parikrama implements reasonable technical and organizational
            safeguards including:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>SSL encryption</li>
            <li>Firewall protection</li>
            <li>Secure servers</li>
            <li>Payment security compliance</li>
            <li>Restricted access controls</li>
            <li>Data monitoring systems</li>
          </ul>

          <p className="mt-4">
            Despite reasonable efforts, no digital platform can guarantee
            absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Payment Gateway Compliance
          </h3>

          <p className="mb-3">
            All online transactions are processed through authorized and secure
            payment gateway providers compliant with:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>RBI regulations</li>
            <li>PCI-DSS security standards</li>
            <li>Banking and financial compliance norms</li>
          </ul>

          <p className="mt-4">
            Refund transactions are generally processed within 7 working days
            subject to banking and service provider timelines.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">User Rights</h3>

          <p className="mb-3">Users may request:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Access to their personal data</li>
            <li>Correction of inaccurate information</li>
            <li>Deletion of data where legally permissible</li>
            <li>Withdrawal of marketing communication consent</li>
          </ul>

          <p className="mt-4">
            Requests may be submitted through the official contact email.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Data Retention</h3>

          <p>
            User information may be retained for operational, legal, compliance,
            taxation, dispute resolution, security, and business continuity
            purposes as required under applicable law.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            International Data Usage
          </h3>

          <p>
            As a global travel platform, certain user information may be
            processed or accessed internationally through authorized travel and
            technology partners.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Children’s Privacy</h3>

          <p>
            The platform is not intentionally directed toward children under the
            age of 18 without parental supervision.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Legal Compliance</h3>

          <p className="mb-3">Parikrama aims to comply with applicable:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Information Technology Act, 2000</li>
            <li>Digital Personal Data Protection Act (India)</li>
            <li>Consumer Protection Guidelines</li>
            <li>RBI payment guidelines</li>
            <li>International travel-related compliance requirements</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Policy Updates</h3>

          <p>
            This Privacy Policy may be updated periodically. Continued use of
            the platform constitutes acceptance of revised policies.
          </p>
        </section>

        <section>
          <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>

          <div className="space-y-1">
            <p>Parikrama – The Path of Travel</p>
            <p>A Unit of Anonz Global LLP</p>
            <p>Noida, Delhi NCR, India</p>
            <p>Email: info@parikramaglobal.com</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
