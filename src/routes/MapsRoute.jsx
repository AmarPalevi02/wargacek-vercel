import React from "react";
import { lazy, Suspense } from "react";
import Spinner from "../components/ui/Spinner";
import { Route, Routes } from "react-router-dom";

const MapLaporan = lazy(() => import("../pages/maps/index"));
const DetailLaporanMap = lazy(() => import("../pages/maps/DetailLaporanMap"));


const MapsRoute = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<MapLaporan />} />
        <Route path="/:id" element={<DetailLaporanMap />} />
      </Routes>
    </Suspense>
  );
};

export default MapsRoute;
