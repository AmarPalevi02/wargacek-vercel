import {
   FETCH_LAPORAN_REQUEST_USER,
   FETCH_LAPORAN_REQUEST_SUCCESS_USER,
   FETCH_LAPORAN_REQUEST_ERROR_USER
} from './constans'

import {
   DELETE_LAPORAN_SUCCESS_USER
} from '../deletedhistoryuser/constans'

const initialState = {
   loading: false,
   data: [],
   error: null,
}

const historyUserReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_LAPORAN_REQUEST_USER:
         return {
            ...state,
            loading: true,
            error: null,
         }

      case FETCH_LAPORAN_REQUEST_SUCCESS_USER:
         return {
            ...state,
            loading: false,
            data: action.payload,
         }

      case FETCH_LAPORAN_REQUEST_ERROR_USER:
         return {
            ...state,
            loading: false,
            error: action.payload,
         }

      case DELETE_LAPORAN_SUCCESS_USER:
         return {
            ...state,
            data: state.data.filter((item) => item.id !== action.payload),
         }


      default:
         return state
   }
}

export default historyUserReducer
