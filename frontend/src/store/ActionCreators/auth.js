import axios from "axios";
import * as ActionTypes from "../ActionTypes";
import { apiUrl } from "../Urls";

export const loginAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.LOGIN_REQUEST });
    return await axios
      .post(`${apiUrl}/login/`, data)
      .then((response) => {
        if (response.data.key) {
          dispatch({
            type: ActionTypes.LOGIN_SUCCESS,
            key: response.data.key,
          });
        } else
          dispatch({
            type: ActionTypes.LOGIN_FAILED,
            errmess: "Login failed",
          });
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.LOGIN_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};

export const logoutAction = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.LOGOUT_REQUEST });
    return await axios
      .post(`${apiUrl}/logout/`, {})
      .then((response) => {
        dispatch({ type: ActionTypes.LOGOUT_SUCCESS });
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.LOGOUT_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};
