import RouteDayCard from "./RouteDayCard";

const RouteTimeline = ({ route }) => {
  return (
    <div className="space-y-6">
      {route.map((place, index) => (
        <RouteDayCard key={place.id} index={index} place={place} />
      ))}
    </div>
  );
};

export default RouteTimeline;
