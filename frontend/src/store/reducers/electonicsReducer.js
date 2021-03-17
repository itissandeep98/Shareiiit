import { setAuthToken, removeAuthToken } from "../../Components/checkAuth";
import * as ActionTypes from "../ActionTypes";

const initState = {
  isLoading: false,
};

export const electronicsReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.ELECTRONICS_FETCH_REQUEST:
      return { ...state, errmess: null, isLoading: true };

    case ActionTypes.ELECTRONICS_FETCH_SUCCESS:
      setAuthToken(action.key);
      return { ...state, errmess: null, data: action.data, isLoading: false };

    case ActionTypes.ELECTRONICS_FETCH_FAILED:
      removeAuthToken();
      return {
        ...state,
        errmess: action.errmess,
        data: null,
        isLoading: false,
      };

    default:
      return state;
  }
};
