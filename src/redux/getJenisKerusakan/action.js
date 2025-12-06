import { getDatas } from '../../utils/fetchDatas'
import {
   START_FETCHING_JENISKERUSAKAN,
   SUCCESS_FETCHING_JENISKERUSAKAN,
   ERROR_FETCHING_JENISKERUSAKAN
} from './constans'

export const startFetchingJenisKerusakan = () => {
   return { type: START_FETCHING_JENISKERUSAKAN }
}

export const successFetchingJenisKerusakan = (data) => {
   return {
      type: SUCCESS_FETCHING_JENISKERUSAKAN,
      payload: data
   }
}

export const errorFetchingJenisKerusakan = () => {
   return { type: ERROR_FETCHING_JENISKERUSAKAN }
}

export const fetchingJenisKejadian = () => {
   return async (dispatch) => {
      dispatch(startFetchingJenisKerusakan())

      try {
         const response = await getDatas('getAllKerusakan')
         dispatch(successFetchingJenisKerusakan(response.data))
      } catch (error) {
         dispatch(errorFetchingJenisKerusakan())
      }
   }
}