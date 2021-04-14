import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = {
  Authorization: "Token " + getAuthToken(),
};

export const fetchBooks = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.BOOKS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/books/`, { headers })
      .then((response) => {
        dispatch({
          type: ActionTypes.BOOKS_FETCH_SUCCESS,
          data: response.data.sort((a, b) =>
            a.created_at < b.created_At ? 1 : -1
          ),
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
      .post(`${apiUrl}/mybooks/`, data, { headers })
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

export const fetchMyBooks = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.USER_BOOKS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/mybooks/`, { headers })
      .then((response) => {
        dispatch({
          type: ActionTypes.USER_BOOKS_FETCH_SUCCESS,
          data: response.data,
        });
        return response.data;
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
