import { Polyline } from "@react-google-maps/api";

const RoutePolyline = ({ path }) => {
  return (
    <Polyline
      path={path}
      options={{
        strokeColor: "#2563eb",
        strokeOpacity: 0.9,
        strokeWeight: 4,
      }}
    />
  );
};

export default RoutePolyline;
