import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getLaporanDetail } from "../../redux/detailLaporan/action";
import {
  FaArrowLeft,
  FaClock,
  FaMapMarkerAlt,
  FaUser,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTools,
  FaFlagCheckered,
  FaThumbsUp,
  FaRegThumbsDown,
  FaComment,
  FaPaperPlane,
  FaTrash,
} from "react-icons/fa";
import { configs } from "../../configs/config";
import SkeletonCard from "../../components/SkeletonCard";
import useAuthToken from "../../hooks/useAuthToken";
import {
  createKomentar,
  deleteKomentar,
  resetDeleteSuccess,
} from "../../redux/komentar/action";
import { showAlert } from "../../redux/alert/action";
import Alert from "../../components/ui/Alert";
import { NavigateBack } from "../../components/ui/NavigateBack";

const DetailLaporanMaps = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [komentarText, setKomentarText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { token, username, email, role, id: userId } = useAuthToken();

  const { laporanDetail, loading, error } = useSelector(
    (state) => state.detailLaporan
  );

  const { deleteSuccess } = useSelector((state) => state.komentar);

  //  Cek apakah user sudah login berdasarkan token
  const isLoggedIn = !!token;

  // User info object untuk konsistensi
  const userInfo = isLoggedIn
    ? {
        id: userId,
        username: username,
        email: email,
        role: role,
        token: token,
      }
    : null;

  // Fungsi untuk mendapatkan warna dan icon berdasarkan status
  const getStatusInfo = (status) => {
    switch (status) {
      case "PENDING":
        return {
          color: "bg-red-100 text-red-800 border-red-300",
          icon: FaExclamationTriangle,
          text: "Menunggu Validasi",
          textColor: "text-red-600",
        };
      case "VALIDATED":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-300",
          icon: FaCheckCircle,
          text: "Tervalidasi",
          textColor: "text-yellow-600",
        };
      case "IN_PROGRESS":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-300",
          icon: FaTools,
          text: "Dalam Penanganan",
          textColor: "text-blue-600",
        };
      case "DONE":
        return {
          color: "bg-green-100 text-green-800 border-green-300",
          icon: FaFlagCheckered,
          text: "Selesai",
          textColor: "text-green-600",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-300",
          icon: FaExclamationTriangle,
          text: "Menunggu Validasi",
          textColor: "text-gray-600",
        };
    }
  };

  // Format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format waktu relatif untuk komentar
  const formatRelativeTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "baru saja";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} menit lalu`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} hari lalu`;

    return formatDate(dateString);
  };

  // Handle submit komentar
  const handleSubmitKomentar = async (e) => {
    e.preventDefault();
    if (!komentarText.trim() || !userInfo) return;

    setIsSubmitting(true);
    try {
      await dispatch(createKomentar(id, komentarText));
      setKomentarText("");
      // Refresh data laporan untuk mendapatkan komentar terbaru
      dispatch(getLaporanDetail(id));
    } catch (error) {
      console.error("Gagal mengirim komentar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete komentar (jika diperlukan)
  const handleDeleteKomentar = (komentarId) => {
    dispatch(
      showAlert("Anda yakin ingin menghapus komentari ini?", "warning", () =>
        dispatch(deleteKomentar(komentarId))
      )
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(getLaporanDetail(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (deleteSuccess && id) {
      dispatch(getLaporanDetail(id));
      setTimeout(() => {
        dispatch(resetDeleteSuccess());
      }, 1000);
    }
  }, [deleteSuccess, dispatch, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <SkeletonCard />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Error: {error}</p>
            <NavigateBack back={"/maps"} />
          </div>
        </div>
      </div>
    );
  }

  if (!laporanDetail) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center py-8">
            <p>Data laporan tidak ditemukan</p>
            <button
              onClick={() => navigate("/pantau")}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Kembali ke Pantau
            </button>
          </div>
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(laporanDetail.status || "PENDING");
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Alert />
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <NavigateBack back={"/maps"} />
        </div>

        {/* Card Detail */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          {/* Gambar */}
          {laporanDetail.foto_url && (
            <div className="h-80 w-full overflow-hidden">
              <img
                src={`${configs.base_url_dev}${laporanDetail.foto_url}`}
                alt="Foto kerusakan"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6">
            {/* Header dengan Status */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex-1">
                {laporanDetail.tipe_kerusakan}
              </h2>
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full border ${statusInfo.color} font-medium`}
              >
                <StatusIcon className="text-sm" />
                <span>{statusInfo.text}</span>
                {laporanDetail.dinas && (
                  <span className="ml-2 text-sm opacity-80">
                    • {laporanDetail.dinas}
                  </span>
                )}
              </div>
            </div>

            {/* Info Update Status */}
            {laporanDetail.statusUpdatedAt && (
              <div className="text-sm text-gray-500 mb-6">
                Terakhir diupdate: {formatDate(laporanDetail.statusUpdatedAt)}
              </div>
            )}

            {/* Deskripsi */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Deskripsi Kerusakan
              </h3>
              <p className="text-gray-600 leading-relaxed text-justify">
                {laporanDetail.deskripsi}
              </p>
            </div>

            {/* Grid Informasi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Informasi Lokasi */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Informasi Lokasi
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-700">Lokasi</p>
                      <p className="text-gray-600">{laporanDetail.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informasi Laporan */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700">
                  Informasi Laporan
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <FaClock className="text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-700">Waktu Laporan</p>
                      <p className="text-gray-600">
                        {formatDate(laporanDetail.waktu_laporan)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaUser className="text-green-600" />
                    <div>
                      <p className="font-medium text-gray-700">Pelapor</p>
                      <p className="text-gray-600">
                        @
                        {laporanDetail.User?.username ||
                          laporanDetail.username ||
                          "Anonim"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistik Voting */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Statistik Voting
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <FaThumbsUp className="text-blue-600 text-xl" />
                  <div>
                    <p className="font-medium text-blue-700">Setuju</p>
                    <p className="text-blue-600">
                      {laporanDetail.likeCount || 0} orang
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <FaRegThumbsDown className="text-red-600 text-xl" />
                  <div>
                    <p className="font-medium text-red-700">Tidak Setuju</p>
                    <p className="text-red-600">
                      {laporanDetail.dislikeCount || 0} orang
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Bar Status */}
            <div className="border-t pt-6 mt-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progres Penanganan</span>
                <span>{statusInfo.text}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-500 ${
                    laporanDetail.status === "PENDING"
                      ? "bg-red-500 w-1/4"
                      : laporanDetail.status === "VALIDATED"
                      ? "bg-yellow-500 w-2/4"
                      : laporanDetail.status === "IN_PROGRESS"
                      ? "bg-blue-500 w-3/4"
                      : laporanDetail.status === "DONE"
                      ? "bg-green-500 w-full"
                      : "bg-gray-500 w-1/4"
                  }`}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Dilaporkan</span>
                <span>Tervalidasi</span>
                <span>Ditangani</span>
                <span>Selesai</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Komentar */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            {/* Header Komentar */}
            <div className="flex items-center gap-3 mb-6">
              <FaComment className="text-blue-600 text-xl" />
              <h2 className="text-xl font-bold text-gray-800">
                Komentar ({laporanDetail.komentarCount || 0})
              </h2>
            </div>

            {/* Form Komentar */}
            {userInfo ? (
              <form onSubmit={handleSubmitKomentar} className="mb-6">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <textarea
                      value={komentarText}
                      onChange={(e) => setKomentarText(e.target.value)}
                      placeholder="Tulis komentar Anda..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows="3"
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={!komentarText.trim() || isSubmitting}
                      className="h-full px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <FaPaperPlane />
                      )}
                      <span className="hidden sm:inline">Kirim</span>
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800">
                  Silakan login untuk menambahkan komentar
                </p>
              </div>
            )}

            {/* Daftar Komentar */}
            <div className="space-y-4">
              {laporanDetail.komentar && laporanDetail.komentar.length > 0 ? (
                laporanDetail.komentar.map((komen) => (
                  <div
                    key={komen.id}
                    className="border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <FaUser className="text-blue-600 text-sm" />
                        </div>
                        <div>
                          <strong className="text-gray-800">
                            {komen.User?.username || "Anonim"}
                          </strong>
                          {userInfo && userInfo.id === komen.User?.id && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                              Anda
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <small className="text-gray-500">
                          {formatRelativeTime(komen.createdAt)}
                        </small>
                        {userInfo && userInfo.id === komen.User?.id && (
                          <button
                            onClick={() => handleDeleteKomentar(komen.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <FaTrash size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-700 ml-10">{komen.konten}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FaComment className="text-4xl mx-auto mb-3 text-gray-300" />
                  <p className="text-lg">Belum ada komentar</p>
                  <p className="text-sm">Jadilah yang pertama berkomentar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailLaporanMaps;
