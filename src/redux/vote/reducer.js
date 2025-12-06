import {
   VOTE_LAPORAN_REQUEST,
   VOTE_LAPORAN_SUCCESS,
   VOTE_LAPORAN_ERROR,
 } from './constans';
 
 const initialState = {
   voting: false,
   error: null,
   lastVote: null, 
 };
 
 const voteLaporanReducer = (state = initialState, action) => {
   switch (action.type) {
     case VOTE_LAPORAN_REQUEST:
       return {
         ...state,
         voting: true,
         error: null,
       };
 
     case VOTE_LAPORAN_SUCCESS:
       return {
         ...state,
         voting: false,
         lastVote: action.payload, 
       };
 
     case VOTE_LAPORAN_ERROR:
       return {
         ...state,
         voting: false,
         error: action.payload,
       };
 
     default:
       return state;
   }
 };
 
 export default voteLaporanReducer;
 