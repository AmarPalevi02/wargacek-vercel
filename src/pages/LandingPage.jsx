import React from "react";
import Button from "../components/ui/Button";
import LogoWc from "../components/LogoWc";
import Navbar from "../components/Navbar";
import PageLayout from "../components/layout/PageLayout";
import useAuthToken from "../hooks/useAuthToken";

import { FaPlusCircle, FaMapMarkerAlt, FaRoute } from "react-icons/fa";
import { BiSolidBarChartSquare } from "react-icons/bi";

const LandingPage = () => {
  const { token, username, email, role } = useAuthToken();

  return (
    <PageLayout>
      <Navbar />

      {/* Header Section */}
      {!token || !username || !email || !role ? (
        <div className="flex justify-end pt-6 gap-3">
          <Button variant="primary" size="md" to="/login">
            Login
          </Button>
          <Button variant="secondary" size="md" to="/register">
            Register
          </Button>
        </div>
      ) : null}

      <section className="max-w-4xl mx-auto pt-16 px-4">
        <LogoWc className="text-4xl mx-auto text-center" />
        <h1 className="text-2xl sm:text-3xl font-bold mt-3 text-center">
          Info Lingkungan dari Warga, untuk Warga
        </h1>
        <p className="text-gray-600 text-justify mt-4 leading-7">
          Meningkatkan partisipasi aktif masyarakat dalam melaporkan kondisi
          lingkungan seperti kerusakan jalan, banjir, dan penutupan jalan
          secara real-time.
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto mt-12 px-4">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="flex items-start gap-3 bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <FaPlusCircle className="text-3xl text-[#6b5778]" />
            <p className="text-base font-medium ">
              Melaporkan kerusakan (lokasi, foto, deskripsi)
            </p>
          </div>

          <div className="flex items-start gap-3 bg-gradient-to-r from-red-100 to-red-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <FaMapMarkerAlt className="text-3xl text-red-500" />
            <p className="text-base font-medium">
              Menampilkan laporan kerusakan
            </p>
          </div>

          <div className="flex items-start gap-3 bg-gradient-to-r from-green-100 to-green-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <BiSolidBarChartSquare className="text-3xl text-[#437057]" />
            <p className="text-base font-medium">
              Voting pada laporan kerusakan
            </p>
          </div>

          <div className="flex items-start gap-3 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <FaRoute className="text-3xl text-indigo-600" />
            <p className="text-base font-medium">Menampilkan rute alternatif</p>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="max-w-4xl mx-auto mt-14 px-4">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-800">Tujuan</h2>
          <p className="text-gray-600 mt-3 text-justify leading-7">
            Menyediakan platform digital berbasis crowdsourcing yang
            memungkinkan warga untuk saling berbagi dan memverifikasi informasi
            lapangan secara cepat dan akurat.
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default LandingPage;
