import {
  combineReducers,
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";

import { thunk } from "redux-thunk";

import authReducer from "./auth/reducer";
import alertReducer from "./alert/reducer";
import jenisKerusakanReducer from "./getJenisKerusakan/reducer";
import laporanReducer from "./postLaporan/reducer";
import getLaporanMapReducer from "./getLaporanMap/reducer";
import gethistoryUser from "./historyUser/reducer";
import deletedHistoryUser from "./deletedhistoryuser/reducer";
import voteLaporanReducer from "./vote/reducer";
import getLaporanByVoteReducer from "./getlaporanbyvote/reducer";
import getDetailLaporanReducer from "./detailLaporan/reducer";
import komentarReducer from "./komentar/reducer";

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// global state
const rootReducers = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  jenisKerusakan: jenisKerusakanReducer,
  laporan: laporanReducer,
  getLaporan: getLaporanMapReducer,
  historyUser: gethistoryUser,
  deletedLaporan: deletedHistoryUser,
  voteLaporan: voteLaporanReducer,
  laporanbyVote: getLaporanByVoteReducer,
  detailLaporan: getDetailLaporanReducer,
  komentar: komentarReducer,
});

const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk))
);

export default store;
