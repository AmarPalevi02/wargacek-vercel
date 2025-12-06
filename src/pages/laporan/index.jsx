import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchingJenisKejadian } from "../../redux/getJenisKerusakan/action";
import { postLaporan, resetPostLaporan } from "../../redux/postLaporan/action";

import PageLayout from "../../components/layout/PageLayout";
import Navbar from "../../components/Navbar";
import DamageTypeDropdown from "./DamageTypeDropdown";
import LocationMarkerUser from "./LocationMarkerUser";
import Button from "../../components/ui/Button";
import useAuthToken from "../../hooks/useAuthToken";
import InputField from "./InputField";
import TextAreaField from "./TextareaField";
import FileField from "./FileField";
import { showAlert } from "../../redux/alert/action";
import Alert from "../../components/ui/Alert";

const Laporan = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.jenisKerusakan);
  const { loading, error, success } = useSelector((state) => state.laporan);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [position, setPosition] = useState(null);
  const { id: userId } = useAuthToken();

  useEffect(() => {
    dispatch(fetchingJenisKejadian());
  }, [dispatch]);

  useEffect(() => {
    if (position) {
      setValue("latitude", position.lat, { shouldValidate: true });
      setValue("longitude", position.lng, { shouldValidate: true });
    }
  }, [position, setValue]);

  useEffect(() => {
    if (success) {
      navigate("/maps");
      dispatch(resetPostLaporan());
    }
    if (error) {
      dispatch(showAlert(`${error}`, "warning"));
      dispatch(resetPostLaporan());
    }
  }, [success, error, navigate, dispatch]);

  const onSubmit = (data) => {
    if (!selected) {
      setValue("jenis_kerusakan", "", { shouldValidate: true });
      return;
    }

    dispatch(
      postLaporan({
        tipe_kerusakan: selected.jenis_kerusakan,
        deskripsi: data.description,
        location: data.location,
        longitude: data.longitude,
        latitude: data.latitude,
        image: data.image[0],
        userId,
      })
    );
  };

  return (
    <PageLayout>
      <Navbar />
      <Alert />
      <div className="pt-5">
        <div>
          <h1 className="text-xl font-semibold">Laporkan Kondisi Sekitarmu</h1>
          <p className="text-justify mt-5 leading-7">
            Bantu sesama warga dengan mengunggah laporan tentang kerusakan
            jalan, banjir, atau gangguan lainnya. Satu laporanmu bisa berdampak
            besar.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <input
            type="hidden"
            {...register("jenis_kerusakan", {
              required: "Jenis kerusakan wajib dipilih",
            })}
          />

          <DamageTypeDropdown
            data={data?.data || []}
            selected={selected}
            setSelected={(item) => {
              setSelected(item);
              setValue("jenis_kerusakan", item?.jenis_kerusakan || "", {
                shouldValidate: true,
              });
            }}
            open={open}
            setOpen={setOpen}
          />
          {errors.jenis_kerusakan && (
            <p className="text-red-500 text-sm mt-1">
              {errors.jenis_kerusakan.message}
            </p>
          )}

          <InputField
            id="location"
            label="Lokasi Kejadian"
            register={register}
            rules={{ required: "Alamat wajib diisi" }}
            errors={errors}
            placeholder="Contoh: Jl. Diponegoro No. 12, Surabaya"
          />

          {/* Deskripsi */}
          <TextAreaField
            id="description"
            label="Deskripsi Kejadian"
            register={register}
            rules={{ required: "Deskripsi wajib diisi" }}
            errors={errors}
            rows={5}
            placeholder="Tuliskan deskripsi kerusakan yang Anda temui..."
          />

          {/* Foto */}
          <FileField
            id="image"
            label="Foto Kerusakan"
            register={register}
            rules={{ required: "Foto wajib diunggah" }}
            errors={errors}
            accept="image/*"
            capture="environment"
          />

          <input
            type="hidden"
            {...register("latitude", { required: "Lokasi wajib ditentukan" })}
          />
          <input
            type="hidden"
            {...register("longitude", { required: "Lokasi wajib ditentukan" })}
          />
          <LocationMarkerUser position={position} setPosition={setPosition} />
          {errors.latitude && (
            <p className="text-red-500 text-sm mt-1">
              {errors.latitude.message}
            </p>
          )}

          <div className="pt-4">
            <Button
              type="submit"
              variant="success"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Mengirim..." : "Kirim Laporan"}
            </Button>
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default Laporan;
