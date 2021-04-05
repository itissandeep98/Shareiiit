import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = {
  Authorization: "Token " + getAuthToken(),
};

export const fetchUser = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.USER_DETAILS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/profile/`, headers)
      .then((response) => {
        dispatch({
          type: ActionTypes.USER_DETAILS_FETCH_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.USER_DETAILS_FETCH_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};
