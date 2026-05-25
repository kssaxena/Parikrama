// import React, { useState, useEffect } from "react";
// import { FetchData } from "../../utils/FetchFromApi";
// import LoadingUI from "../../components/LoadingUI";

// const TermsOfService = ({ startLoading, stopLoading }) => {
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
//         res?.data?.data?.termsOfService || {
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
//       <h1 className="text-3xl font-bold">Terms of Service</h1>

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

// export default LoadingUI(TermsOfService);

// TermsOfService.jsx

import React from "react";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 md:px-16 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">TERMS OF SERVICE</h1>

        <h2 className="text-xl font-semibold mb-1">
          Parikrama – The Path of Travel
        </h2>

        <p className="mb-8 text-gray-600">A Unit of Anonz Global LLP</p>

        <p className="mb-10 font-medium">Effective Date: 23rd May, 2026</p>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Introduction</h3>

          <p>
            Welcome to Parikrama – The Path of Travel (“Parikrama”, “Company”,
            “we”, “our”, or “us”). By accessing or using our website, mobile
            platform, travel portal, booking services, content, or related
            applications, users agree to comply with and be legally bound by
            these Terms of Service.
          </p>

          <p className="mt-4">
            The platform is designed to provide travel-related information,
            local guides, destination listings, travel assistance, ticket
            booking, travel packages, hotel reservations, transportation
            services, and technology-enabled travel solutions for users
            globally.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Eligibility</h3>

          <p>
            Users must be at least 18 years of age or legally authorized to
            enter into binding agreements under applicable laws to use our
            services.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Services Offered</h3>

          <p className="mb-3">Parikrama may provide:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Domestic & International Flight Booking</li>
            <li>Hotel & Accommodation Booking</li>
            <li>Travel Packages & Holiday Tours</li>
            <li>Local Travel Guide Information</li>
            <li>Destination Listings & Travel Content</li>
            <li>Transportation & Travel Assistance</li>
            <li>Visa & Documentation Support</li>
            <li>Travel Technology & Information Services</li>
            <li>User Reviews, Ratings, and Recommendations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">User Responsibilities</h3>

          <p className="mb-3">Users agree:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>
              To provide accurate and complete information during registration
              or booking
            </li>
            <li>Not to misuse the platform for unlawful activities</li>
            <li>
              Not to copy, distribute, modify, or exploit website content
              without authorization
            </li>
            <li>
              To comply with all applicable local, national, and international
              laws
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Booking & Payment Terms
          </h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              All bookings are subject to availability and confirmation from
              service providers.
            </li>

            <li>
              Prices may vary based on market conditions, availability, taxes,
              airline/hotel policy, and third-party service providers.
            </li>

            <li>
              Payments are processed through secure and authorized payment
              gateways compliant with RBI guidelines, PCI-DSS standards, and
              applicable payment regulations.
            </li>

            <li>
              Users are responsible for ensuring correct payment details during
              transactions.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Cancellation & Refund Policy
          </h3>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              Cancellation requests shall be processed as per the applicable
              airline, hotel, package, transport, or vendor policy.
            </li>

            <li>
              Refund eligibility depends upon supplier policies and applicable
              deductions.
            </li>

            <li>
              Eligible refunds shall generally be processed within 7 working
              days from confirmation of cancellation.
            </li>

            <li>
              Delays caused by banking networks, payment gateways, financial
              institutions, or third-party providers shall not be the direct
              liability of the Company.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Intellectual Property Rights
          </h3>

          <p>
            All website content including logos, design, graphics, software,
            travel data, content, text, images, APIs, technology infrastructure,
            and digital assets are the intellectual property of Parikrama or its
            licensors and are protected under applicable intellectual property
            laws.
          </p>

          <p className="mt-4">
            Unauthorized use, reproduction, data extraction, scraping, or
            redistribution is strictly prohibited.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Data Usage & Marketing Consent
          </h3>

          <p className="mb-3">
            By using this portal, users agree that the Company may use
            non-sensitive user data for:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Service improvement</li>
            <li>Marketing communication</li>
            <li>Travel recommendations</li>
            <li>Analytics & customer experience enhancement</li>
            <li>Promotional campaigns</li>
            <li>Global publication of travel-related information</li>
          </ul>

          <p className="mt-4">
            Sensitive personal information shall be protected and processed in
            accordance with applicable privacy laws.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Third-Party Services</h3>

          <p>
            Parikrama may integrate with third-party vendors including airlines,
            hotels, payment gateways, APIs, mapping services, travel technology
            providers, and booking systems.
          </p>

          <p className="mt-4">
            The Company shall not be directly responsible for service failures,
            delays, cancellations, losses, or disputes arising from third-party
            service providers.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Limitation of Liability
          </h3>

          <p className="mb-3">The Company shall not be liable for:</p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Flight cancellations or delays</li>
            <li>Visa rejection</li>
            <li>Natural disasters or force majeure events</li>
            <li>Loss of luggage or personal belongings</li>
            <li>Travel disruptions caused by external agencies</li>
            <li>User negligence or misinformation</li>
          </ul>

          <p className="mt-4">
            Users are advised to independently verify travel requirements before
            booking.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Security & Compliance</h3>

          <p className="mb-3">
            Parikrama follows industry-standard security measures including:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>SSL encryption</li>
            <li>Secure payment gateway integration</li>
            <li>Access control systems</li>
            <li>Data protection mechanisms</li>
            <li>Cybersecurity monitoring</li>
          </ul>

          <p className="mt-5 mb-3">
            The platform aims to comply with applicable:
          </p>

          <ul className="list-disc pl-6 space-y-1">
            <li>Information Technology Act, 2000 (India)</li>
            <li>Digital Personal Data Protection Act (DPDP Act)</li>
            <li>RBI payment regulations</li>
            <li>PCI-DSS payment security standards</li>
            <li>Consumer protection guidelines</li>
            <li>Travel and tourism regulatory requirements</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Suspension & Termination
          </h3>

          <p>
            The Company reserves the right to suspend or terminate accounts that
            violate these Terms or engage in fraudulent, abusive, illegal, or
            harmful activities.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            Governing Law & Jurisdiction
          </h3>

          <p>
            These Terms shall be governed by the laws of India. Any disputes
            shall be subject to the jurisdiction of courts located in Noida /
            Delhi NCR, India.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4">Modifications</h3>

          <p>
            Parikrama reserves the right to modify these Terms at any time
            without prior notice. Continued use of the platform constitutes
            acceptance of updated Terms.
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

export default TermsOfService;
