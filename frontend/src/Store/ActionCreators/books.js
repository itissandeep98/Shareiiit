import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = () => ({
  Authorization: "Token " + getAuthToken(),
});

export const fetchBookDetails = (id) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.POST_DETAILS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/api/posts/${id}/?category=book`, { headers: headers() })
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

export const fetchBooks = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.BOOKS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/api/posts/?category=book`, { headers: headers() })
      .then((response) => {
        const data = response.data.results;
        dispatch({
          type: ActionTypes.BOOKS_FETCH_SUCCESS,
          data: data,
        });
        return data;
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ActionTypes.BOOKS_FETCH_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};

export const createBookPost = (data) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.POST_CREATE_REQUEST });
    return await axios
      .post(`${apiUrl}/api/myposts/?category=book`, data, {
        headers: headers(),
      })
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

export const deleteBookPost = (id) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.BOOK_DELETE_REQUEST });
    return await axios
      .delete(`${apiUrl}/api/myposts/${id}/`, { headers: headers() })
      .then((response) => {
        dispatch({
          type: ActionTypes.BOOK_DELETE_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.BOOK_DELETE_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};

export const fetchMyBooks = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.USER_BOOKS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/api/myposts/?category=book`, { headers: headers() })
      .then((response) => {
        dispatch({
          type: ActionTypes.USER_BOOKS_FETCH_SUCCESS,
          data: response.data.results,
        });
        return response.data.results;
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ActionTypes.USER_BOOKS_FETCH_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};

export const updateBookPost = ({ id, data }) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.BOOK_UPDATE_REQUEST });
    return await axios
      .patch(`${apiUrl}/api/myposts/${id}/`, data, { headers: headers() })
      .then((response) => {
        dispatch({
          type: ActionTypes.BOOK_UPDATE_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
        if (error?.response?.data?.detail) {
          dispatch({
            type: ActionTypes.BOOK_UPDATE_FAILED,
            errmess: error.response.data.detail,
          });
        } else {
          dispatch({
            type: ActionTypes.BOOK_UPDATE_FAILED,
            errmess: "Error in connection with Server",
          });
        }
      });
  };
};
