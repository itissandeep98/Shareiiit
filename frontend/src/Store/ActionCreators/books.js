import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = () => ({
  Authorization: "Token " + getAuthToken(),
});

export const fetchBooks = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.BOOKS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/api/books/`, { headers: headers() })
      .then((response) => {
        const data = response.data.results;
        dispatch({
          type: ActionTypes.BOOKS_FETCH_SUCCESS,
          data: data,
        });
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
    dispatch({ type: ActionTypes.BOOK_CREATE_REQUEST });
    return await axios
      .post(`${apiUrl}/api/mybooks/`, data, { headers: headers() })
      .then((response) => {
        dispatch({
          type: ActionTypes.BOOK_CREATE_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
        if (error?.response?.data?.detail) {
          dispatch({
            type: ActionTypes.BOOK_CREATE_FAILED,
            errmess: error.response.data.detail,
          });
        } else {
          dispatch({
            type: ActionTypes.BOOK_CREATE_FAILED,
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
      .delete(`${apiUrl}/api/mybooks/${id}/`, { headers: headers() })
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
      .get(`${apiUrl}/api/mybooks/`, { headers: headers() })
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
