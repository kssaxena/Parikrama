import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchData } from "../../utils/FetchFromApi";
import LoadingUI from "../../components/LoadingUI";
import RandomImageSlider from "../../components/ui/RandomImageSlider";
import Button from "../../components/Button";
import {
  BiMap,
  BiSolidStar,
  BiPhone,
  BiEnvelope,
  BiGlobe,
  BiCalendar,
  BiGroup,
} from "react-icons/bi";

const CurrentClub = ({ startLoading, stopLoading }) => {
  const { clubId } = useParams();
  const [club, setClub] = useState(null);
  const [error, setError] = useState("");

  const loadClub = async () => {
    try {
      startLoading();
      const response = await FetchData(`clubs/${clubId}`, "get");
      setClub(response?.data?.data || null);
    } catch (err) {
      setError("Unable to load club details. Please try again.");
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    loadClub();
  }, [clubId]);

  if (!club) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        {error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="text-gray-500">Loading club details...</div>
        )}
      </div>
    );
  }

  const imageList =
    club.images?.gallery?.length > 0
      ? club.images.gallery.map((item) => item.url)
      : club.images?.coverImage?.url
        ? [club.images.coverImage.url]
        : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
            {imageList.length > 0 ? (
              <RandomImageSlider images={imageList} />
            ) : (
              <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500">No images available</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <BiMap /> {club.location?.address || "No address"},{" "}
                {club.location?.city}, {club.location?.state}
              </p>
              <h1 className="text-3xl font-bold text-gray-900 mt-3">
                {club.clubName}
              </h1>
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF4D3] px-4 py-2">
                  <BiSolidStar /> {club.ratings?.average || 0} / 5 (
                  {club.ratings?.count || 0} ratings)
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F3FF] px-4 py-2">
                  {club.category || "Social Club"}
                </span>
                {club.adminVerified && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#F0FDF4] px-4 py-2">
                    ✓ Verified
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {club.description || "No description available."}
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-gray-200 bg-white p-5">
                <h2 className="text-lg font-semibold mb-3">Contact</h2>
                {club.contactDetails?.phone && (
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <BiPhone /> {club.contactDetails.phone}
                  </p>
                )}
                {club.contactDetails?.email && (
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <BiEnvelope /> {club.contactDetails.email}
                  </p>
                )}
                {club.contactDetails?.website && (
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <BiGlobe />{" "}
                    <a
                      href={club.contactDetails.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#1F6FEB] underline"
                    >
                      Visit website
                    </a>
                  </p>
                )}
              </div>

              <div className="rounded-3xl border border-gray-200 bg-white p-5">
                <h2 className="text-lg font-semibold mb-3">Club Info</h2>
                {club.foundedYear && (
                  <p className="text-sm text-gray-700">
                    Founded: {club.foundedYear}
                  </p>
                )}
                <p className="text-sm text-gray-700 flex items-center gap-2 mt-2">
                  <BiGroup /> {club.members?.length || 0} members
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2 mt-2">
                  <BiCalendar /> {club.events?.length || 0} events
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {club.images?.logo?.url && (
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <img
                src={club.images.logo.url}
                alt={club.clubName}
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Amenities</h2>
            <div className="flex flex-wrap gap-2">
              {club.amenities?.length > 0 ? (
                club.amenities.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-[#F8F6EE] px-3 py-2 text-sm"
                  >
                    {item}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-600">No amenities listed.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {club.membershipPlans && club.membershipPlans.length > 0 && (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Membership Plans</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {club.membershipPlans.map((plan, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-2xl font-bold text-[#1F6FEB] mb-2">
                  ₹{plan.price}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  {plan.durationMonths} months
                </p>
                {plan.benefits && plan.benefits.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Benefits:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {plan.benefits.map((benefit, idx) => (
                        <li key={idx}>• {benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {club.events && club.events.length > 0 && (
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {club.events.map((event, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition"
              >
                <h3 className="font-semibold text-gray-900">{event.title}</h3>
                {event.date && (
                  <p className="text-sm text-gray-600 mt-1">
                    Date: {new Date(event.date).toLocaleDateString()}
                  </p>
                )}
                {event.description && (
                  <p className="text-sm text-gray-600 mt-2">
                    {event.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingUI(CurrentClub);
