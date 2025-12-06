import { getDatas } from "../../utils/fetchDatas";
import {
  FETCH_LAPORAN_VOTE_FAILURE,
  FETCH_LAPORAN_VOTE_REQUEST,
  FETCH_LAPORAN_VOTE_SUCCESS,
  RESET_FETCH_LAPORAN_VOTE,
} from "./constans";
import { radiusCOnfigs } from "../../configs/constans";

const getStoredRadius = () => {
  const stored = localStorage.getItem("selectedRadius");
  console.log(stored)
  return stored ? parseInt(stored) : radiusCOnfigs.DEFAULT_RADIUS;
};

export const fetchLaporanVote =
  ({ userLat, userLng } = {}) =>
  async (dispatch) => {
    dispatch({ type: FETCH_LAPORAN_VOTE_REQUEST });
    try {
      const query =
        userLat && userLng
          ? `?userLat=${userLat}&userLng=${userLng}&radius=${
               getStoredRadius()
            }`
          : "";
      const response = await getDatas(`laporan-vote${query}`);
      dispatch({
        type: FETCH_LAPORAN_VOTE_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_LAPORAN_VOTE_FAILURE,
        payload: error.message,
      });
    }
  };

export const resetFetchLaporanVote = () => ({
  type: RESET_FETCH_LAPORAN_VOTE,
});
