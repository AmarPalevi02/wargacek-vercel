import { useMap } from "react-leaflet";

const SetMapRef = ({ mapRef }) => {
   const map = useMap();
   mapRef.current = map;
   return null;
};

export default SetMapRef;
