import { postData } from '../../utils/fetchDatas';
import {
  START_POST_LAPORAN,
  SUCCESS_POST_LAPORAN,
  ERROR_POST_LAPORAN,
  RESET_POST_LAPORAN,
} from './constans';

export const startPostLaporan = () => {
  return { type: START_POST_LAPORAN };
};

export const successPostLaporan = (data) => {
  return {
    type: SUCCESS_POST_LAPORAN,
    payload: data,
  };
};

export const errorPostLaporan = (error) => {
  return {
    type: ERROR_POST_LAPORAN,
    payload: error,
  };
};

export const resetPostLaporan = () => {
  return { type: RESET_POST_LAPORAN };
};

// export const postLaporan = ({ tipe_kerusakan, deskripsi, location, longitude, latitude, image, userId }) => {
//   return async (dispatch) => {
//     dispatch(startPostLaporan());

//     try {
//       const formData = new FormData();
//       formData.append('tipe_kerusakan', tipe_kerusakan);
//       formData.append('deskripsi', deskripsi);
//       formData.append('location', location)
//       formData.append('longitude', longitude);
//       formData.append('latitude', latitude);
//       if (image) formData.append('foto', image);
//       formData.append('userId', userId);

//       const response = await postData(formData, true, 'unggahlaporan');
//       dispatch(successPostLaporan(response.data));
//     } catch (error) {
//       dispatch(errorPostLaporan(error.response?.data?.error || error.message));
//     }
//   };
// };



export const postLaporan = ({ tipe_kerusakan, deskripsi, location, longitude, latitude, image, userId }) => {
  return async (dispatch) => {
    dispatch(startPostLaporan());

    try {
      const formData = new FormData();
      formData.append('tipe_kerusakan', tipe_kerusakan);
      formData.append('deskripsi', deskripsi);
      formData.append('location', location)
      formData.append('longitude', longitude);
      formData.append('latitude', latitude);
      if (image) formData.append('foto', image);
      formData.append('userId', userId);

      const response = await postData(formData, true, 'unggahlaporan');
      dispatch(successPostLaporan(response.data));
    } catch (error) {
      // Handle error response dengan lebih spesifik
      const errorData = error.response?.data;
      
      if (errorData?.msg === "File too large") {
        dispatch(errorPostLaporan("File terlalu besar. Silakan upload file yang lebih kecil."));
      } else {
        dispatch(errorPostLaporan(errorData?.error || errorData?.msg || error.message));
      }
    }
  };
};