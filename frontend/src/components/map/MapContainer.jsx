import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { MAP_CONFIG } from "../../config/map.config";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapContainer = ({ center, children }) => {
  return (
    <LoadScript googleMapsApiKey={MAP_CONFIG.googleMapsApiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center || MAP_CONFIG.defaultCenter}
        zoom={MAP_CONFIG.defaultZoom}
      >
        {children}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapContainer;
