import { radiusCOnfigs, STORAGE_KEYS } from "../../configs/constans";
import {
  FETCH_LAPORAN_FAILURE,
  FETCH_LAPORAN_REQUEST,
  FETCH_LAPORAN_SUCCESS,
  LOAD_RADIUS_FROM_STORAGE,
  RESET_FETCH_LAPORAN,
  SET_RADIUS,
} from "./constans";


const initialState = {
  data: [],
  loading: false,
  error: null,
  radius: radiusCOnfigs.DEFAULT_RADIUS,
};

// const laporanReducer = (state = initialState, action) => {
//    switch (action.type) {
//       case FETCH_LAPORAN_REQUEST:
//          return {
//             ...state,
//             loading: true,
//             error: null
//          };

//       case FETCH_LAPORAN_SUCCESS:
//          return {
//             ...state,
//             loading: false,
//             data: action.payload,
//             error: null
//          };

//       case FETCH_LAPORAN_FAILURE:
//          return {
//             ...state,
//             loading: false,
//             error: action.payload
//          };
//       case RESET_FETCH_LAPORAN:
//          return initialState;
//       default:
//          return state;
//    }
// };

const laporanReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LAPORAN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_LAPORAN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case FETCH_LAPORAN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_RADIUS:
      return {
        ...state,
        radius: action.payload,
      };

    case LOAD_RADIUS_FROM_STORAGE:
      return {
        ...state,
        radius: action.payload,
      };

    case RESET_FETCH_LAPORAN:
      return initialState;

    default:
      return state;
  }
};

export default laporanReducer;
