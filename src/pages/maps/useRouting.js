import { useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import { useDispatch } from "react-redux";
import { showAlert } from "../../redux/alert/action";

const useRouting = (mapRef, position, data) => {
   const [routeControl, setRouteControl] = useState(null);
   const dispatch = useDispatch()


   const calculateRoute = (dest) => {
      const map = mapRef.current;
      if (!map || !position || !dest) return;

      if (routeControl) {
         map.removeControl(routeControl);
      }

      const newRouteControl = L.Routing.control({
         waypoints: [
            L.latLng(position.lat, position.lng),
            L.latLng(dest.lat, dest.lng),
         ],
         router: L.Routing.osrmv1({
            serviceUrl: "https://router.project-osrm.org/route/v1",
         }),
         lineOptions: {
            styles: [{ color: "blue", opacity: 0.8, weight: 6 }],
         },
         routeWhileDragging: true,
         showAlternatives: true,
         altLineOptions: {
            styles: [{ color: "green", opacity: 0.7, weight: 4 }],
         },
         createMarker: () => null,
      }).addTo(map);

      newRouteControl.on("routesfound", (e) => {
         const coords = e.routes[0].coordinates;
         let melewatiKerusakan = false;

         data.forEach((laporan) => {
            const kerusakanLatLng = L.latLng(laporan.latitude, laporan.longitude);
            coords.forEach((coord) => {
               const point = L.latLng(coord.lat, coord.lng);
               if (point.distanceTo(kerusakanLatLng) < 50) {
                  melewatiKerusakan = true;
               }
            });
         });

         if (melewatiKerusakan) {
            dispatch(showAlert(
               "Rute utama melewati titik kerusakan. Gunakan rute alternatif (hijau).",
               "warning"
            ));
         }
      });

      setRouteControl(newRouteControl);
   };

   return { calculateRoute };
};

export default useRouting;
