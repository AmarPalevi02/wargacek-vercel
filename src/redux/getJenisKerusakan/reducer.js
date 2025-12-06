import {
   START_FETCHING_JENISKERUSAKAN,
   SUCCESS_FETCHING_JENISKERUSAKAN,
   ERROR_FETCHING_JENISKERUSAKAN
} from './constans'

const initialState = {
   loading: false,
   data: [],
   error: false,
};

const jenisKerusakanReducer = (state = initialState, action) => {
   switch (action.type) {
      case START_FETCHING_JENISKERUSAKAN:
         return {
            ...state,
            loading: true,
            error: false,
         };
      case SUCCESS_FETCHING_JENISKERUSAKAN:
         return {
            ...state,
            loading: false,
            data: action.payload,
         };
      case ERROR_FETCHING_JENISKERUSAKAN:
         return {
            ...state,
            loading: false,
            error: true,
         };
      default:
         return state;
   }
};

export default jenisKerusakanReducer;
