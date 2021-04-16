import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = {
  Authorization: "Token " + getAuthToken(),
};
export const fetchMessages = (data) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.MESSAGE_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/messages/`, { params: data, headers })
      .then((response) => {
        const data = response.data.results;
        dispatch({
          type: ActionTypes.MESSAGE_FETCH_SUCCESS,
          data: data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ActionTypes.MESSAGE_FETCH_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};

export const createMessage = (data) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.MESSAGE_CREATE_REQUEST });
    return await axios
      .post(`${apiUrl}/messages/`, data, { headers })
      .then((response) => {
        dispatch({
          type: ActionTypes.MESSAGE_CREATE_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
        dispatch({
          type: ActionTypes.MESSAGE_CREATE_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};
