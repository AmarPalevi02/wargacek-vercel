import React, { useRef, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { IoLocateSharp } from 'react-icons/io5';

import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function LocationMarker({ position, setPosition }) {
   const markerRef = useRef(null);

   useEffect(() => {
      if (position && markerRef.current) {
         markerRef.current.setLatLng(position);
      }
   }, [position]);

   return position === null ? null : (
      <Marker
         position={position}
         draggable={true}
         ref={markerRef}
         eventHandlers={{
            dragend: () => {
               const marker = markerRef.current;
               if (marker != null) {
                  setPosition(marker.getLatLng()); 
               }
            },
         }}
      >
         <Popup>Lokasi Laporan</Popup>
      </Marker>
   );
}

function SetMapRef({ mapRef }) {
   const map = useMap();
   mapRef.current = map;
   return null;
}

const LocationMarkerUser = ({ position, setPosition }) => {
   const mapRef = useRef(null);

   const handleLocateClick = () => {
      const map = mapRef.current;
      if (!map) return;

      map.locate();
      map.on('locationfound', (e) => {
         setPosition(e.latlng);
         map.flyTo(e.latlng, map.getZoom());
      });
      map.on('locationerror', (e) => {
         alert('Gagal mendapatkan lokasi: ' + e.message);
      });
   };

   return (
      <div className="relative w-full h-80 mt-10 bg-amber-300">
         <div className="relative w-full max-w-lg mx-auto h-full">
            <button
               type="button"
               onClick={handleLocateClick}
               className="absolute z-10 bottom-20 right-6 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition"
            >
               <IoLocateSharp className="text-2xl text-black" />
            </button>

            <MapContainer
               className="w-full z-0 h-full"
               center={{ lat: -7.2575, lng: 112.7521 }}
               zoom={13}
               scrollWheelZoom={false}
            >
               <SetMapRef mapRef={mapRef} />
               <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
               />
               <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
         </div>
      </div>
   );
};

export default LocationMarkerUser;