import axios from "axios";
import * as ActionTypes from "../ActionTypes";
import { apiUrl } from "../Urls";

export const loginAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.LOGIN_REQUEST });
    return await axios
      .post(`${apiUrl}/login/`, data)
      .then((response) => {
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          key: response.data.key,
        });
      })
      .catch((error) => {
        console.log(error.response);
        if (error?.response?.data?.error) {
          dispatch({
            type: ActionTypes.LOGIN_FAILED,
            errmess: error?.response?.data?.error,
          });
        } else {
          dispatch({
            type: ActionTypes.LOGIN_FAILED,
            errmess: "Error in connection with Server",
          });
        }
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

export const registerAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.REGISTER_REQUEST });
    return await axios
      .post(`${apiUrl}/register/`, data)
      .then((response) => {
        dispatch({
          type: ActionTypes.REGISTER_SUCCESS,
          key: response.data.key,
        });
      })
      .catch((error) => {
        console.log(error.response);
        if (error?.response?.data?.error) {
          dispatch({
            type: ActionTypes.REGISTER_FAILED,
            errmess: error?.response?.data?.error,
          });
        } else {
          dispatch({
            type: ActionTypes.REGISTER_FAILED,
            errmess: "Error in connection with Server",
          });
        }
      });
  };
};
