const PlaceSkeleton = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 animate-pulse">
      <div className="h-40 bg-gray-200" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-full" />
      </div>
    </div>
  );
};

export default PlaceSkeleton;
