import PlaceCard from "./PlaceCard";
import PlaceSkeleton from "./PlaceSkeleton";

const PlaceList = ({ places, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <PlaceSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!places.length) {
    return (
      <div className="text-center text-gray-500 py-10">No places found.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {places.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </div>
  );
};

export default PlaceList;
