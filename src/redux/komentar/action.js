import { deleteData, postData } from "../../utils/fetchDatas";
import {
  KOMENTAR_CREATE_FAIL,
  KOMENTAR_CREATE_REQUEST,
  KOMENTAR_CREATE_SUCCESS,
  KOMENTAR_DELETE_FAIL,
  KOMENTAR_DELETE_REQUEST,
  KOMENTAR_DELETE_SUCCESS,
} from "./constans";


export const createKomentar = (laporanId, konten) => async (dispatch) => {
  try {
    dispatch({ type: KOMENTAR_CREATE_REQUEST });

    const { data } = await postData(
      { konten },
      false,
      `laporan/${laporanId}/komentar`
    );

    dispatch({
      type: KOMENTAR_CREATE_SUCCESS,
      payload: data.data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: KOMENTAR_CREATE_FAIL,
      payload: error.response?.data?.error || error.message,
    });
    throw error;
  }
};

export const deleteKomentar = (komentarId) => async (dispatch) => {
  try {
    dispatch({ type: KOMENTAR_DELETE_REQUEST });

    const { data } = await deleteData(`komentar/${komentarId}`);

    dispatch({
      type: KOMENTAR_DELETE_SUCCESS,
      payload: komentarId,
    });

    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "Gagal menghapus komentar";

    dispatch({
      type: KOMENTAR_DELETE_FAIL,
      payload: errorMessage,
    });

    throw new Error(errorMessage);
  }
};

export const resetDeleteSuccess = () => ({
  type: "KOMENTAR_RESET_DELETE_SUCCESS",
});
