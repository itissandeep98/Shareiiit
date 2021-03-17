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
      .get(`${apiUrl}/books/`, headers)
      .then((response) => {
        if (response.data) {
          dispatch({
            type: ActionTypes.BOOKS_FETCH_SUCCESS,
            data: response.data,
          });
        } else
          dispatch({
            type: ActionTypes.BOOKS_FETCH_FAILED,
            errmess: "Fetch failed",
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
