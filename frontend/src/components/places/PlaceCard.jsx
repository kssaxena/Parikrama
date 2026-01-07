const PlaceCard = ({ place }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition">
      <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400">
        Image
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>

        <p className="text-sm text-gray-600 mt-1">{place.category}</p>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {place.description}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            ⏱ {place.averageTimeSpent} min
          </span>

          <span className="text-sm font-medium text-[#2563eb]">View →</span>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
