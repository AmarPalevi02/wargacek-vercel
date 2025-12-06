import {
  FETCH_LAPORAN_VOTE_FAILURE,
  FETCH_LAPORAN_VOTE_REQUEST,
  FETCH_LAPORAN_VOTE_SUCCESS,
  RESET_FETCH_LAPORAN_VOTE,
} from "./constans";

import { VOTE_LAPORAN_SUCCESS } from "../vote/constans";
import { radiusCOnfigs } from "../../configs/constans";

const initialState = {
  data: [],
  loading: true,
  error: null,
  radius: radiusCOnfigs.DEFAULT_RADIUS
};

const laporanReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LAPORAN_VOTE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_LAPORAN_VOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };

    case FETCH_LAPORAN_VOTE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case RESET_FETCH_LAPORAN_VOTE:
      return initialState;

    case VOTE_LAPORAN_SUCCESS: {
      return {
        ...state,
        data: state.data.map((laporan) => {
          if (laporan.id !== action.payload?.laporanId) return laporan;

          let { likeCount = 0, dislikeCount = 0 } = laporan;
          const newType = action.payload.type;

          // Pindah vote
          if (newType === "LIKE") {
            if (laporan.userVote === "DISLIKE") {
              dislikeCount = Math.max(0, dislikeCount - 1);
            }
            if (laporan.userVote !== "LIKE") {
              likeCount += 1;
            }
          } else if (newType === "DISLIKE") {
            if (laporan.userVote === "LIKE") {
              likeCount = Math.max(0, likeCount - 1);
            }
            if (laporan.userVote !== "DISLIKE") {
              dislikeCount += 1;
            }
          }

          return {
            ...laporan,
            likeCount,
            dislikeCount,
            userVote: newType,
          };
        }),
      };
    }

    default:
      return state;
  }
};

export default laporanReducer;
