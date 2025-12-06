import React, { useEffect } from "react";
import SkeletonCard from "../../components/SkeletonCard";

import {
  FaClock,
  FaMapMarkerAlt,
  FaTrash,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTools,
  FaFlagCheckered,
  FaUser,
} from "react-icons/fa";
import useAuthToken from "../../hooks/useAuthToken";
import { useDispatch, useSelector } from "react-redux";
import { fetchingHistoryUser } from "../../redux/historyUser/action";
import { deleteLaporanUser } from "../../redux/deletedhistoryuser/action";
import { configs } from "../../configs/config";
import { showAlert } from "../../redux/alert/action";

const CardRiwayat = () => {
  const { id: userId } = useAuthToken();
  const dispatch = useDispatch();

  const { loading, data: history } = useSelector((state) => state.historyUser);
  const { success: deleteSuccess } = useSelector(
    (state) => state.deletedLaporan
  );

  useEffect(() => {
    if (userId) {
      dispatch(fetchingHistoryUser(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (deleteSuccess && userId) {
      dispatch(fetchingHistoryUser(userId));
    }
  }, [deleteSuccess, userId, dispatch]);

  const handleDelete = (laporanId) => {
    dispatch(
      showAlert("Apakah yakin ingin menghapus laporan ini?", "warning", () =>
        dispatch(deleteLaporanUser(laporanId))
      )
    );
  };

  // Fungsi untuk mendapatkan info status
  const getStatusInfo = (status) => {
    switch (status) {
      case "PENDING":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: FaExclamationTriangle,
          text: "Pending",
          shortText: "Pending",
          bgColor: "bg-red-50",
        };
      case "VALIDATED":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: FaCheckCircle,
          text: "Tervalidasi",
          shortText: "Valid",
          bgColor: "bg-yellow-50",
        };
      case "IN_PROGRESS":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: FaTools,
          text: "Dalam Proses",
          shortText: "Proses",
          bgColor: "bg-blue-50",
        };
      case "DONE":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: FaFlagCheckered,
          text: "Selesai",
          shortText: "Selesai",
          bgColor: "bg-green-50",
        };
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: FaExclamationTriangle,
          text: "Pending",
          shortText: "Pending",
          bgColor: "bg-gray-50",
        };
    }
  };

  // Format tanggal untuk mobile
  const formatMobileDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

    if (diffHours <= 1) return "Baru saja";
    if (diffHours <= 24) return `${diffHours} jam lalu`;

    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return "Kemarin";
    if (diffDays <= 7) return `${diffDays} hari lalu`;

    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    });
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="pb-4">
      {history.length === 0 ? (
        <div className="text-center py-8 px-4 bg-white rounded-xl border border-gray-200 mx-2">
          <div className="text-gray-300 text-5xl mb-3">📝</div>
          <h3 className="text-base font-medium text-gray-700 mb-1">
            Belum ada laporan
          </h3>
          <p className="text-sm text-gray-500">
            Laporan yang Anda buat akan muncul di sini.
          </p>
        </div>
      ) : (
        <div className="space-y-3 px-2">
          {history.map((item, i) => {
            // Ambil status terbaru
            const latestStatus =
              item.statuses && item.statuses.length > 0
                ? item.statuses.sort(
                    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
                  )[0]
                : null;

            const statusInfo = getStatusInfo(latestStatus?.status || "PENDING");
            const StatusIcon = statusInfo.icon;

            return (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden active:scale-[0.98] transition-transform duration-150"
              >
                {/* Header*/}
                <div className="relative">
                  {/* Foto */}
                  <div className="h-40 w-full">
                    <img
                      src={`${configs.base_url_dev}${item.foto_url}`}
                      alt="foto laporan"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Overlay status di atas foto */}
                  <div className="absolute top-3 left-3">
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full border text-xs font-medium ${statusInfo.color} backdrop-blur-sm`}
                    >
                      <StatusIcon className="text-xs" />
                      <span>{statusInfo.shortText}</span>
                    </div>
                  </div>

                  {/* Tombol hapus */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="absolute top-3 right-3 bg-white/90 text-gray-600 p-2 rounded-full shadow-sm active:bg-gray-100 transition-colors"
                    title="Hapus laporan"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>

                {/* Konten */}
                <div className="p-3">
                  {/* Judul dan waktu */}
                  <div className="mb-2">
                    <h2 className="text-base font-semibold text-gray-900 line-clamp-1 mb-1">
                      {item.jenisKerusakan?.jenis_kerusakan ||
                        item.tipe_kerusakan}
                    </h2>
                    <div className="text-xs text-gray-500 flex items-center justify-between">
                      <span>{formatMobileDate(item.waktu_laporan)}</span>
                      {latestStatus?.updatedAt && (
                        <span>
                          Update: {formatMobileDate(latestStatus.updatedAt)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Deskripsi */}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3 leading-relaxed">
                    {item.deskripsi}
                  </p>

                  {/* Informasi lokasi */}
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
                    <FaMapMarkerAlt className="text-gray-400 flex-shrink-0" />
                    <span className="line-clamp-1 text-xs">
                      {item.location || "-"}
                    </span>
                  </div>

                  {/* Info dinas penanggung jawab */}
                  {latestStatus?.Dinas?.name && (
                    <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 rounded-lg py-1.5">
                      <FaUser className="text-gray-400" />
                      <span className="flex-1">
                        Ditangani:{" "}
                        <span className="font-medium">
                          {latestStatus.Dinas.name}
                        </span>
                      </span>
                    </div>
                  )}

                  {/* Progress bar sederhana */}
                  <div className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all ${
                          latestStatus?.status === "PENDING"
                            ? "bg-red-400 w-1/4"
                            : latestStatus?.status === "VALIDATED"
                            ? "bg-yellow-400 w-2/4"
                            : latestStatus?.status === "IN_PROGRESS"
                            ? "bg-blue-400 w-3/4"
                            : latestStatus?.status === "DONE"
                            ? "bg-green-400 w-full"
                            : "bg-gray-400 w-1/4"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Detail waktu lengkap*/}
                  <details className="mt-2">
                    <summary className="text-xs text-gray-500 cursor-pointer list-none">
                      📅 Detail waktu
                    </summary>
                    <div className="mt-1 text-xs text-gray-600 space-y-1">
                      <div>
                        Dibuat:{" "}
                        {new Date(item.waktu_laporan).toLocaleString("id-ID")}
                      </div>
                      {latestStatus?.updatedAt && (
                        <div>
                          Status update:{" "}
                          {new Date(latestStatus.updatedAt).toLocaleString(
                            "id-ID"
                          )}
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CardRiwayat;
