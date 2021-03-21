import { setAuthToken, removeAuthToken } from "../../Components/checkAuth";
import * as ActionTypes from "../ActionTypes";

const initState = {
  isLoading: false,
};

export const authReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return { ...state, errmess: null, isLoading: true };

    case ActionTypes.LOGIN_SUCCESS:
      // setAuthToken(action.key);
      return { ...state, errmess: null, key: action.key, isLoading: false };

    case ActionTypes.LOGIN_FAILED:
      // removeAuthToken();
      return { ...state, errmess: action.errmess, key: null, isLoading: false };

    case ActionTypes.LOGOUT_SUCCESS:
      // removeAuthToken();
      return { ...state, errmess: null, key: null, isLoading: false };

    default:
      return state;
  }
};
