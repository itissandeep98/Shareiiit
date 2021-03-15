import * as ActionTypes from "../ActionTypes";

const initState = {
  isLoading: false,
  user: {},
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return { ...state, errmess: null, isLoading: true };

    case ActionTypes.LOGIN_SUCCESS:
      return { ...state, errmess: null, user: action.user, isLoading: false };

    case ActionTypes.LOGIN_FAILED:
      return { ...state, errmess: action.errmess, user: {}, isLoading: false };

    case ActionTypes.LOGOUT_SUCESS:
      return { ...state, errmess: null, user: {}, isLoading: false };

    default:
      return state;
  }
};
