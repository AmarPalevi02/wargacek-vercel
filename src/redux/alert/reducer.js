import { HIDE_ALERT, SHOW_ALERT } from "./constans";

const initialState = {
   message: '',
   type: '',
   show: false,
   onConfirm: null,
};

export default function reducer(state = initialState, action) {
   switch (action.type) {
      case SHOW_ALERT:
         return {
            ...action.payload,
            show: true,
            onConfirm: action.payload.onConfirm || null,
         };
      case HIDE_ALERT:
         return {
            ...state,
            show: false
         };
      default:
         return state;
   }
}