import {
   FETCH_LAPORAN_REQUEST_ERROR_USER,
   FETCH_LAPORAN_REQUEST_SUCCESS_USER,
   FETCH_LAPORAN_REQUEST_USER
} from './constans'
import { getDatas } from '../../utils/fetchDatas'


export const startFetchingHistoryUser = () => ({
   type: FETCH_LAPORAN_REQUEST_USER
})

export const successFetchingHistoryUser = (data) => ({
   type: FETCH_LAPORAN_REQUEST_SUCCESS_USER,
   payload: data
})

export const errorFetchingHistoryUser = (error) => ({
   type: FETCH_LAPORAN_REQUEST_ERROR_USER,
   payload: error
})

export const fetchingHistoryUser = (userId) => async (dispatch) => {
   dispatch(startFetchingHistoryUser());

   try {
      const response = await getDatas(`history/${userId}`);
      dispatch(successFetchingHistoryUser(response.data.data));
   } catch (error) {
      dispatch(errorFetchingHistoryUser(error.message || 'Gagal mengambil history laporan user'));
   }
};
