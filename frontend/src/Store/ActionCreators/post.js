import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = {
  Authorization: "Token " + getAuthToken(),
};

export const fetchPostDetails = (id) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.POST_DETAILS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/posts/${id}`, { headers })
      .then((response) => {
        dispatch({
          type: ActionTypes.POST_DETAILS_FETCH_SUCCESS,
          data: response.data,
        });
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ActionTypes.POST_DETAILS_FETCH_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};

export const addVote = (data) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.LIKE_ADD_REQUEST, data: data });
    return await axios
      .post(`${apiUrl}/votes/`, data, { headers })
      .then((response) => {
        dispatch({
          type: ActionTypes.LIKE_ADD_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.LIKE_ADD_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};

export const fetchVotedPosts = (data) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.VOTED_POST_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/voted`, { params: data, headers })
      .then((response) => {
        dispatch({
          type: ActionTypes.VOTED_POST_FETCH_SUCCESS,
          data: response.data,
        });
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ActionTypes.VOTED_POST_FETCH_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};
