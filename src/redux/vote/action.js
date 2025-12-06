
import { postData } from '../../utils/fetchDatas';
import {
   VOTE_LAPORAN_REQUEST,
   VOTE_LAPORAN_SUCCESS,
   VOTE_LAPORAN_ERROR,
} from './constans';


export const startVoteLaporan = () => ({
   type: VOTE_LAPORAN_REQUEST,
});

export const successVoteLaporan = (laporanId, type, likeCount, dislikeCount) => ({
   type: VOTE_LAPORAN_SUCCESS,
   payload: { laporanId, type, likeCount, dislikeCount },
});


export const errorVoteLaporan = (error) => ({
   type: VOTE_LAPORAN_ERROR,
   payload: error,
});


export const voteLaporan = (laporanId, type) => async (dispatch) => {
   dispatch(startVoteLaporan());

   try {
      const res = await postData({ type }, false, `laporan/${laporanId}/vote`);

      dispatch(successVoteLaporan(
         laporanId,
         type,
         res.likeCount,
         res.dislikeCount
      ));
   } catch (error) {
      dispatch(errorVoteLaporan(error.message || 'Gagal melakukan vote'));
   }
};



