import { setAuthToken, removeAuthToken } from "../../Components/checkAuth";
import * as ActionTypes from "../ActionTypes";

const initState = {
  isLoading: false,
};

export const bookReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.BOOKS_FETCH_REQUEST:
      return { ...state, errmess: null, isLoading: true };

    case ActionTypes.BOOKS_FETCH_SUCCESS:
      setAuthToken(action.key);
      return { ...state, errmess: null, books: action.data, isLoading: false };

    case ActionTypes.BOOKS_FETCH_FAILED:
      removeAuthToken();
      return {
        ...state,
        errmess: action.errmess,
        books: null,
        isLoading: false,
      };

    default:
      return state;
  }
};
