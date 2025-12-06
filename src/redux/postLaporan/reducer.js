import {
   START_POST_LAPORAN,
   SUCCESS_POST_LAPORAN,
   ERROR_POST_LAPORAN,
   RESET_POST_LAPORAN,
} from './constans';

const initialState = {
   loading: false,
   data: null,
   error: false,
   success: false,
};

const laporanReducer = (state = initialState, action) => {
   switch (action.type) {
      case START_POST_LAPORAN:
         return {
            ...state,
            loading: true,
            error: false,
            success: false,
         };
      case SUCCESS_POST_LAPORAN:
         return {
            ...state,
            loading: false,
            data: action.payload,
            success: true,
         };
      case ERROR_POST_LAPORAN:
         return {
            ...state,
            loading: false,
            error: action.payload,
         };
      case RESET_POST_LAPORAN:
         return {
            ...state,
            loading: false,
            data: null,
            error: false,
            success: false,
         };
      default:
         return state;
   }
};

export default laporanReducer;