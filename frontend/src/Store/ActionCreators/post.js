import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = () => ({
  Authorization: "Token " + getAuthToken(),
});

export const fetchPostDetails = (id) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.POST_DETAILS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/api/posts/${id}`, { headers: headers() })
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

export const addVote = ({ id, data }) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.LIKE_ADD_REQUEST, data: data });
    return await axios
      .patch(`${apiUrl}/api/votelog/`, data, {
        params: { post: id },
        headers: headers(),
      })
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

export const deleteVote = (id) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.LIKE_DELETE_REQUEST, id: id });
    return await axios
      .delete(`${apiUrl}/votes/${id}`, { headers: headers() })
      .then((response) => {
        dispatch({
          type: ActionTypes.LIKE_DELETE_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.LIKE_DELETE_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};

export const fetchVotedPosts = (data) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.VOTED_POST_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/api/voted`, { params: data, headers: headers() })
      .then((response) => {
        dispatch({
          type: ActionTypes.VOTED_POST_FETCH_SUCCESS,
          data: response.data.results,
        });
        return response.data.results;
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
