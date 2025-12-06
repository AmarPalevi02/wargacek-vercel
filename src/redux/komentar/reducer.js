import {
  KOMENTAR_CREATE_REQUEST,
  KOMENTAR_CREATE_SUCCESS,
  KOMENTAR_CREATE_FAIL,
  KOMENTAR_DELETE_REQUEST,
  KOMENTAR_DELETE_SUCCESS,
  KOMENTAR_DELETE_FAIL,
} from "./constans";

const initialState = {
  loading: false,
  error: null,
  createLoading: false,
  deleteLoading: false,
  deleteSuccess: false,
};

const komentarReducer = (state = initialState, action) => {
  switch (action.type) {
    case KOMENTAR_CREATE_REQUEST:
      return { ...state, createLoading: true, error: null };
    case KOMENTAR_CREATE_SUCCESS:
      return { ...state, createLoading: false };
    case KOMENTAR_CREATE_FAIL:
      return { ...state, createLoading: false, error: action.payload };

    case KOMENTAR_DELETE_REQUEST:
      return { ...state, deleteLoading: true, error: null };
    case KOMENTAR_DELETE_SUCCESS:
      return { ...state, deleteLoading: false, deleteSuccess: true };
    case KOMENTAR_DELETE_FAIL:
      return { ...state, deleteLoading: false, error: action.payload };

    case "KOMENTAR_RESET_DELETE_SUCCESS":
      return { ...state, deleteSuccess: false };

    default:
      return state;
  }
};

export default komentarReducer;
