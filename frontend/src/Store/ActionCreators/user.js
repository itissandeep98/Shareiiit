import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = () => ({
  Authorization: "Token " + getAuthToken(),
  "Content-Type": "application/json",
});

export const fetchUser = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.USER_DETAILS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/api/profile/`, { headers: headers() })
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

export const updateUser = (data) => {
  console.log(data);
  return async (dispatch) => {
    dispatch({ type: ActionTypes.USER_DETAILS_UPDATE_REQUEST });
    return await axios
      .patch(`${apiUrl}/api/profile/`, data, { headers: headers() })
      .then((response) => {
        dispatch({
          type: ActionTypes.USER_DETAILS_UPDATE_SUCCESS,
          data: response.data,
        });
        return response.data;
      });
    // .catch((error) => {
    //   console.log(error.response);
    //   dispatch({
    //     type: ActionTypes.USER_DETAILS_UPDATE_FAILED,
    //     errmess: error.response,
    //   });
    // });
  };
};
