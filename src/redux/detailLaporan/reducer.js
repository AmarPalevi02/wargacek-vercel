import {
  LAPORAN_DETAIL_FAIL,
  LAPORAN_DETAIL_REQUEST,
  LAPORAN_DETAIL_RESET,
  LAPORAN_DETAIL_SUCCESS,
} from "./constans";

const initialState = {
  laporanDetail: null,
  loading: false,
  error: null,
};

const detailLaporanReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAPORAN_DETAIL_REQUEST:
      return { ...state, loading: true, error: null };

    case LAPORAN_DETAIL_SUCCESS:
      return { ...state, loading: false, laporanDetail: action.payload };

    case LAPORAN_DETAIL_FAIL:
      return { ...state, loading: false, error: action.payload };

    case LAPORAN_DETAIL_RESET:
      return { ...state, laporanDetail: null };

    default:
      return state;
  }
};

export default detailLaporanReducer