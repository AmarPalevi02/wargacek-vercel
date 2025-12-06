import { getDatas } from "../../utils/fetchDatas";
import { LAPORAN_DETAIL_FAIL, LAPORAN_DETAIL_REQUEST, LAPORAN_DETAIL_SUCCESS } from "./constans";

export const getLaporanDetail = (laporanId) => async (dispatch) => {
  try {
    dispatch({ type: LAPORAN_DETAIL_REQUEST });

    const { data } = await getDatas(`laporan/${laporanId}`);

    dispatch({
      type: LAPORAN_DETAIL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: LAPORAN_DETAIL_FAIL,
      payload: error.response?.data?.error || error.message,
    });
  }
};
