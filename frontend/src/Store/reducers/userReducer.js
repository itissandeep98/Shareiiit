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
    case ActionTypes.USER_DETAILS_FETCH_REQUEST:
      return { ...state, errmess: null, isLoading: true };

    case ActionTypes.USER_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        errmess: null,
        details: action.data,
        isLoading: false,
      };

    case ActionTypes.USER_DETAILS_FETCH_FAILED:
      return {
        ...state,
        errmess: action.errmess,
        isLoading: false,
      };
    case ActionTypes.OSA_USER_DETAILS_FETCH_REQUEST:
      return { ...state, errmess: null, isLoading: true };

    case ActionTypes.OSA_USER_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        errmess: null,
        osadetails: action.data,
        isLoading: false,
      };

    case ActionTypes.OSA_USER_DETAILS_FETCH_FAILED:
      return {
        ...state,
        errmess: action.errmess,
        isLoading: false,
      };
    case ActionTypes.USER_POST_FETCH_REQUEST:
      return { ...state, errmess: null, isLoading: true };

    case ActionTypes.USER_POST_FETCH_SUCCESS:
      return {
        ...state,
        errmess: null,
        books: action.data,
        isLoading: false,
      };

    case ActionTypes.USER_POST_FETCH_FAILED:
      return {
        ...state,
        errmess: action.errmess,
        books: null,
        isLoading: false,
      };

    case ActionTypes.VOTED_POST_FETCH_REQUEST:
      return { ...state, errmess: null, isLoading: true };

    case ActionTypes.VOTED_POST_FETCH_SUCCESS:
      return {
        ...state,
        errmess: null,
        voted: action.data,
        isLoading: false,
      };

    case ActionTypes.VOTED_POST_FETCH_FAILED:
      return {
        ...state,
        errmess: action.errmess,
        voted: null,
        isLoading: false,
      };
    case ActionTypes.USER_SKILLS_FETCH_REQUEST:
      return { ...state, errmess: null, isLoading: true };

    case ActionTypes.USER_SKILLS_FETCH_SUCCESS:
      return {
        ...state,
        errmess: null,
        skills: action.data,
        isLoading: false,
      };

    case ActionTypes.USER_SKILLS_FETCH_FAILED:
      return {
        ...state,
        errmess: action.errmess,
        skills: null,
        isLoading: false,
      };

    default:
      return state;
  }
};
