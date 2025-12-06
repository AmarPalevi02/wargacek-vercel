import { getDatas } from "../../utils/fetchDatas";
import {
  FETCH_LAPORAN_FAILURE,
  FETCH_LAPORAN_REQUEST,
  FETCH_LAPORAN_SUCCESS,
  LOAD_RADIUS_FROM_STORAGE,
  RESET_FETCH_LAPORAN,
  SET_RADIUS,
} from "./constans";

import { radiusCOnfigs, STORAGE_KEYS } from "../../configs/constans";

const getStoredRadius = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.SELECTED_RADIUS);
  return stored ? parseInt(stored) : radiusCOnfigs.DEFAULT_RADIUS;
};

// Action untuk load radius dari localStorage
export const loadRadiusFromStorage = () => (dispatch) => {
  const storedRadius = getStoredRadius();
  dispatch({
    type: LOAD_RADIUS_FROM_STORAGE,
    payload: storedRadius,
  });
};

// export const fetchLaporan = ({ userLat, userLng, radius } = {}) =>
//   async (dispatch) => {
//     dispatch({ type: FETCH_LAPORAN_REQUEST });
//     try {
//       const query =
//         userLat && userLng
//           ? `?userLat=${userLat}&userLng=${userLng}&radius=${
//               radius || radiusCOnfigs.DEFAULT_RADIUS
//             }`
//           : "";
//       const response = await getDatas(`laporan${query}`);
//       dispatch({
//         type: FETCH_LAPORAN_SUCCESS,
//         payload: response.data.data,
//       });
//     } catch (error) {
//       dispatch({
//         type: FETCH_LAPORAN_FAILURE,
//         payload: error.message,
//       });
//     }
//   };

export const fetchLaporan =
  ({ userLat, userLng, radius } = {}) =>
  async (dispatch) => {
    dispatch({ type: FETCH_LAPORAN_REQUEST });
    try {
      const selectedRadius = radius || getStoredRadius();

      const query =
        userLat && userLng
          ? `?userLat=${userLat}&userLng=${userLng}&radius=${selectedRadius}`
          : "";
      const response = await getDatas(`laporan${query}`);
      dispatch({
        type: FETCH_LAPORAN_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_LAPORAN_FAILURE,
        payload: error.message,
      });
    }
  };

export const setRadius = (radius) => (dispatch) => {
  localStorage.setItem(STORAGE_KEYS.SELECTED_RADIUS, radius.toString());

  dispatch({
    type: SET_RADIUS,
    payload: radius,
  });
};

export const resetFetchLaporan = () => ({
  type: RESET_FETCH_LAPORAN,
});
