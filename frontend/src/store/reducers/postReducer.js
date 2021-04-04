import { removeAuthToken } from "../../Components/checkAuth";
import * as ActionTypes from "../ActionTypes";

const initState = {
  isLoading: false,
  all: [],
};

export const postReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.BOOKS_FETCH_REQUEST:
      return { ...state, errmess: null, isLoading: true };

    case ActionTypes.BOOKS_FETCH_SUCCESS:
      return {
        ...state,
        errmess: null,
        books: action.data,
        isLoading: false,
      };

    case ActionTypes.BOOKS_FETCH_FAILED:
      return {
        ...state,
        errmess: action.errmess,
        books: null,
        isLoading: false,
      };
    case ActionTypes.ELECTRONICS_FETCH_REQUEST:
      return { ...state, errmess: null, isLoading: true };

    case ActionTypes.ELECTRONICS_FETCH_SUCCESS:
      return {
        ...state,
        errmess: null,
        electronics: action.data,
        isLoading: false,
      };

    case ActionTypes.ELECTRONICS_FETCH_FAILED:
      return {
        ...state,
        errmess: action.errmess,
        electronics: null,
        isLoading: false,
      };

    case ActionTypes.GROUPS_FETCH_REQUEST:
      return { ...state, errmess: null, isLoading: true };

    case ActionTypes.GROUPS_FETCH_SUCCESS:
      return {
        ...state,
        errmess: null,
        groups: action.data,
        isLoading: false,
      };

    case ActionTypes.GROUPS_FETCH_FAILED:
      return {
        ...state,
        errmess: action.errmess,
        groups: null,
        isLoading: false,
      };
    case ActionTypes.OTHER_FETCH_REQUEST:
      return { ...state, errmess: null, isLoading: true };

    case ActionTypes.OTHER_FETCH_SUCCESS:
      return {
        ...state,
        errmess: null,
        other: action.data,
        isLoading: false,
      };

    case ActionTypes.OTHER_FETCH_FAILED:
      return {
        ...state,
        errmess: action.errmess,
        other: null,
        isLoading: false,
      };

    default:
      return state;
  }
};
