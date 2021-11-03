import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = () => ({
  Authorization: "Token " + getAuthToken(),
});

export const fetchOther = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.OTHER_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/api/posts/?category=other`, { headers: headers() })
      .then((response) => {
        dispatch({
          type: ActionTypes.OTHER_FETCH_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ActionTypes.OTHER_FETCH_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};

export const createOtherPost = (data) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.POST_CREATE_REQUEST });
    return await axios
      .post(`${apiUrl}/api/others/`, data, { headers: headers() })
      .then((response) => {
        dispatch({
          type: ActionTypes.POST_CREATE_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
        if (error?.response?.data?.detail) {
          dispatch({
            type: ActionTypes.POST_CREATE_FAILED,
            errmess: error.response.data.detail,
          });
        } else {
          dispatch({
            type: ActionTypes.POST_CREATE_FAILED,
            errmess: "Error in connection with Server",
          });
        }
      });
  };
};
