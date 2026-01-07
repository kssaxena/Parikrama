import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import PlaceFilters from "../../components/places/PlaceFilters";
import PlaceList from "../../components/places/PlaceList";

const MOCK_PLACES = [
  {
    id: "1",
    name: "Rajwada Palace",
    category: "Heritage",
    description: "Historic palace in the heart of the city.",
    averageTimeSpent: 90,
  },
  {
    id: "2",
    name: "Lal Bagh Palace",
    category: "Heritage",
    description: "Royal palace with beautiful gardens.",
    averageTimeSpent: 120,
  },
  {
    id: "3",
    name: "Patalpani Waterfall",
    category: "Nature",
    description: "Scenic waterfall near Indore.",
    averageTimeSpent: 60,
  },
];

const Places = () => {
  const [places] = useState(MOCK_PLACES);
  const [loading] = useState(false);

  const handleFilterChange = () => {
    // API filters will come here
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Places to Visit
        </h1>

        <PlaceFilters onFilterChange={handleFilterChange} />
        <PlaceList places={places} loading={loading} />
      </div>
    </>
  );
};

export default Places;
