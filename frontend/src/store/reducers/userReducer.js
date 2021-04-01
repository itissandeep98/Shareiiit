import * as ActionTypes from "../ActionTypes";

const initState = {
  isLoading: false,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return { ...state, errmess: null, isLoading: true };

    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, errmess: null, key: action.key, isLoading: false };

    case ActionTypes.LOGIN_FAILED:
      return { ...state, errmess: action.errmess, key: null, isLoading: false };

    case ActionTypes.REGISTER_SUCCESS:
      return { ...state, errmess: null, key: action.key, isLoading: false };

    case ActionTypes.REGISTER_FAILED:
      return { ...state, errmess: action.errmess, key: null, isLoading: false };

    case ActionTypes.LOGOUT_SUCCESS:
      return { ...state, errmess: null, key: null, isLoading: false };

    default:
      return state;
  }
};

export const detailsReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.USER_BOOKS_FETCH_REQUEST:
      return { ...state, errmess: null, isLoading: true };

    case ActionTypes.USER_BOOKS_FETCH_SUCCESS:
      return {
        ...state,
        errmess: null,
        books: action.data,
        isLoading: false,
      };

    case ActionTypes.USER_BOOKS_FETCH_FAILED:
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
