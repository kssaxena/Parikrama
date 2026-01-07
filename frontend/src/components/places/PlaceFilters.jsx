const PlaceFilters = ({ onFilterChange }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
      <div className="flex flex-wrap gap-4">
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          onChange={(e) => onFilterChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Temple">Temple</option>
          <option value="Nature">Nature</option>
          <option value="Heritage">Heritage</option>
          <option value="Adventure">Adventure</option>
        </select>

        <select
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          onChange={(e) => onFilterChange("time", e.target.value)}
        >
          <option value="">Any Duration</option>
          <option value="60">Up to 1 hour</option>
          <option value="120">Up to 2 hours</option>
          <option value="180">Up to 3 hours</option>
        </select>
      </div>
    </div>
  );
};

export default PlaceFilters;
