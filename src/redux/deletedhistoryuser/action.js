import { deleteData } from '../../utils/fetchDatas';
import {
   DELETE_LAPORAN_REQUEST_USER,
   DELETE_LAPORAN_SUCCESS_USER,
   DELETE_LAPORAN_ERROR_USER,
} from './constans';

export const startDeleteLaporanUser = () => ({
   type: DELETE_LAPORAN_REQUEST_USER,
});

export const successDeleteLaporanUser = (laporanId) => ({
   type: DELETE_LAPORAN_SUCCESS_USER,
   payload: laporanId,
});

export const errorDeleteLaporanUser = (error) => ({
   type: DELETE_LAPORAN_ERROR_USER,
   payload: error,
});

export const deleteLaporanUser = (laporanId) => async (dispatch) => {
   dispatch(startDeleteLaporanUser());

   try {
      await deleteData(`delete-history/${laporanId}`);
      dispatch(successDeleteLaporanUser(laporanId));
   } catch (error) {
      dispatch(errorDeleteLaporanUser(error.message || 'Gagal menghapus laporan user'));
   }
};
