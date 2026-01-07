const RouteDayCard = ({ index, place }) => {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center text-sm font-semibold">
          {index + 1}
        </div>
        <div className="flex-1 w-px bg-gray-300 mt-1" />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>

        <p className="text-sm text-gray-600 mt-1">{place.category}</p>

        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
          <span>⏱ {place.time} mins</span>
          <span>📍 {place.distance} km</span>
        </div>
      </div>
    </div>
  );
};

export default RouteDayCard;
