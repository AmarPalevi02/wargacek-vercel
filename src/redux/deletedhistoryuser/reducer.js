import {
   DELETE_LAPORAN_REQUEST_USER,
   DELETE_LAPORAN_SUCCESS_USER,
   DELETE_LAPORAN_ERROR_USER,
} from './constans';

const initialState = {
   deleting: false,
   error: null,
};

const deleteLaporanUserReducer = (state = initialState, action) => {
   switch (action.type) {
      case DELETE_LAPORAN_REQUEST_USER:
         return {
            ...state,
            deleting: true,
            error: null,
         };

      case DELETE_LAPORAN_SUCCESS_USER:
         return {
            ...state,
            deleting: false,
            error: null,
         };

      case DELETE_LAPORAN_ERROR_USER:
         return {
            ...state,
            deleting: false,
            error: action.payload,
         };

      default:
         return state;
   }
};

export default deleteLaporanUserReducer;
