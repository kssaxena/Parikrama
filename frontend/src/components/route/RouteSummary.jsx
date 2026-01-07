const RouteSummary = ({ summary }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900">Route Summary</h2>

      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Total Stops</p>
          <p className="font-semibold text-gray-900">{summary.totalStops}</p>
        </div>

        <div>
          <p className="text-gray-500">Total Time</p>
          <p className="font-semibold text-gray-900">
            {summary.totalTime} mins
          </p>
        </div>

        <div>
          <p className="text-gray-500">Distance</p>
          <p className="font-semibold text-gray-900">
            {summary.totalDistance} km
          </p>
        </div>

        <div>
          <p className="text-gray-500">Recommended Days</p>
          <p className="font-semibold text-gray-900">{summary.days}</p>
        </div>
      </div>
    </div>
  );
};

export default RouteSummary;
