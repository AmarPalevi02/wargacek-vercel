import React from "react";
import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Spinner from "../components/ui/Spinner";

const Pantau = lazy(() => import("../pages/pantau"));
const DetailLaporan = lazy(() => import("../pages/pantau/DetailLaporan"));



const PantauRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<Pantau />} />
        <Route path="/:id" element={<DetailLaporan />} />
      </Routes>
    </Suspense>
  );
};

export default PantauRoutes;