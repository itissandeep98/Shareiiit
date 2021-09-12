import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = () => ({
  Authorization: "Token " + getAuthToken(),
});

export const fetchGroups = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GROUPS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/api/posts/?category=group`, { headers: headers() })
      .then((response) => {
        dispatch({
          type: ActionTypes.GROUPS_FETCH_SUCCESS,
          data: response.data.results,
        });
        return response.data.results;
      })
      .catch((error) => {
        console.log(error.response);
        dispatch({
          type: ActionTypes.GROUPS_FETCH_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};

export const createGroupPost = (data) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.POST_CREATE_REQUEST });
    return await axios
      .post(`${apiUrl}/api/groups/`, data, { headers: headers() })
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
