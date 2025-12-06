import { Marker, Popup } from "react-leaflet";

const LocationMarker = ({ position }) => {
   if (!position) return null;
   return (
      <Marker position={[position.lat, position.lng]}>
         <Popup>Lokasi Anda</Popup>
      </Marker>
   );
};

export default LocationMarker;
