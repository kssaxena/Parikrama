import { useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import RouteTimeline from "../../components/route/RouteTimeline";
import RouteSummary from "../../components/route/RouteSummary";
import MapContainer from "../../components/map/MapContainer";
import MapMarker from "../../components/map/MapMarker";
import RoutePolyline from "../../components/map/RoutePolyline";
import { useRouteStore } from "../../store";

const RoutePlanner = () => {
  const { route, summary, loading, error, generateOptimizedRoute } =
    useRouteStore();

  useEffect(() => {
    // Example payload — replace cityId & coords dynamically later
    generateOptimizedRoute({
      cityId: "CITY_ID_HERE",
      startLat: 22.7196,
      startLng: 75.8577,
    });
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 text-gray-500">
          Generating optimized route...
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 text-red-500">{error}</div>
      </>
    );
  }

  if (!route.length) {
    return (
      <>
        <Navbar />
        <div className="text-center py-20 text-gray-500">
          No route available
        </div>
      </>
    );
  }

  const polylinePath = route.map((p) => ({
    lat: p.location.coordinates[1],
    lng: p.location.coordinates[0],
  }));

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT: Route Info */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">
            Optimized Travel Route
          </h1>

          <RouteSummary summary={summary} />
          <RouteTimeline
            route={route.map((p, index) => ({
              id: p._id,
              name: p.name,
              category: p.category,
              time: p.averageTimeSpent,
              distance: index === 0 ? 0 : p.distanceFromPrevious,
            }))}
          />
        </div>

        {/* RIGHT: Map */}
        <div className="h-[600px] bg-white border border-gray-200 rounded-xl overflow-hidden">
          <MapContainer center={polylinePath[0]}>
            {route.map((p, index) => (
              <MapMarker
                key={p._id}
                position={{
                  lat: p.location.coordinates[1],
                  lng: p.location.coordinates[0],
                }}
                label={`${index + 1}`}
              />
            ))}

            <RoutePolyline path={polylinePath} />
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default RoutePlanner;
