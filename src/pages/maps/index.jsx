import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLaporan,
  loadRadiusFromStorage,
  resetFetchLaporan,
} from "../../redux/getLaporanMap/action";
import { markerDestination } from "../../assets/leaflet-icon";
import { showAlert } from "../../redux/alert/action";

import useRouting from "./useRouting";
import DestinationForm from "./DestinationForm";
import LocateButton from "./LocateButton";
import ToggleFormButton from "./ToggleFormButton";
import LaporanMarkers from "./LaporanMarkers";
import LocationMarker from "./LocationMarker";
import Navbar from "../../components/Navbar";
import Alert from "../../components/ui/Alert";
import RadiusSelector from "./RadiusSelector";
import Spinner from "../../components/ui/Spinner";

const MapLaporan = () => {
  const dispatch = useDispatch();
  const { data, loading, error, radius } = useSelector(
    (state) => state.getLaporan
  );

  const [position, setPosition] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const mapRef = useRef(null);

  const { calculateRoute } = useRouting(mapRef, position, data);

  // Load radius dari localStorage saat komponen mount
  useEffect(() => {
    dispatch(loadRadiusFromStorage());
  }, [dispatch]);

  // Ambil lokasi awal user
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ lat: latitude, lng: longitude });
        dispatch(
          fetchLaporan({
            userLat: latitude,
            userLng: longitude,
            radius: radius,
          })
        );

        // Set center map ke lokasi user saat pertama kali load
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 13);
        }
      },
      () => {
        dispatch(fetchLaporan());
      }
    );

    return () => {
      dispatch(resetFetchLaporan());
    };
  }, [dispatch]);

  // Refresh data ketika radius berubah dan position tersedia
  useEffect(() => {
    if (position && radius) {
      dispatch(
        fetchLaporan({
          userLat: position.lat,
          userLng: position.lng,
          radius: radius,
        })
      );
    }
  }, [radius, position, dispatch]);


  const handleLocateClick = () => {
    if (!navigator.geolocation) {
      dispatch(showAlert("Geolocation tidak didukung di browser ini", "error"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPosition = { lat: latitude, lng: longitude };

        setPosition(newPosition);

        // Set center map ke lokasi user 
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 16);
        }

        dispatch(
          fetchLaporan({
            userLat: latitude,
            userLng: longitude,
            radius: radius,
          })
        );
      },
      (error) => {
        console.error("Error getting location:", error);
        let errorMessage = "Gagal mendapatkan lokasi";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Izin akses lokasi ditolak. Silakan aktifkan izin lokasi.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Informasi lokasi tidak tersedia.";
            break;
          case error.TIMEOUT:
            errorMessage = "Permintaan lokasi timeout.";
            break;
          default:
            errorMessage = "Error tidak diketahui saat mengambil lokasi.";
        }

        dispatch(showAlert(errorMessage, "error"));
      }
    );
  };


  // Submit tujuan
  const handleDestinationSubmit = async (e) => {
    e.preventDefault();
    const input = e.target.destination.value.trim();
    if (!input)
      return dispatch(showAlert("Tujuan tidak boleh kosong!", "warning"));

    const coordMatch = input.match(/^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/);
    if (coordMatch) {
      const [lat, lng] = input.split(",").map(Number);
      setDestination({ lat, lng });
      calculateRoute({ lat, lng });
      setShowForm(false);
      return;
    }

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          input
        )}&format=json&limit=1`
      );
      const data = await res.json();
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setDestination({ lat, lng });
        calculateRoute({ lat, lng });
        setShowForm(false);
      } else {
        dispatch(showAlert("Alamat tidak ditemukan.", "warning"));
      }
    } catch (error) {
      console.error("Fetch error:", error);
      dispatch(showAlert("Gagal mencari alamat.", "warning"));
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center">Error: {error}</div>;

  return (
    <div className="w-full h-screen overflow-y-hidden">
      <Navbar />

      <div className="relative w-full max-w-lg mx-auto h-full">
        <Alert />
        <RadiusSelector />
        <LocateButton onClick={handleLocateClick} />
        <ToggleFormButton
          showForm={showForm}
          onClick={() => setShowForm(!showForm)}
        />
        <DestinationForm
          showForm={showForm}
          onSubmit={handleDestinationSubmit}
        />

        <MapContainer
          className="w-full z-0 h-full"
          center={position || { lat: -7.2575, lng: 112.7521 }} 
          zoom={13}
          scrollWheelZoom={false}
          ref={mapRef} 
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <LaporanMarkers data={data} />
          <LocationMarker position={position} />

          {destination && (
            <Marker
              position={[destination.lat, destination.lng]}
              icon={markerDestination}
            >
              <Popup>Tujuan Anda</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapLaporan;
