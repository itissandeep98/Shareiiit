import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = () => ({
  Authorization: "Token " + getAuthToken(),
});

export const fetchUser = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.USER_DETAILS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/profile/`, { headers: headers() })
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

export const updateUser = ({ id, data }) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.USER_DETAILS_UPDATE_REQUEST });
    return await axios
      .patch(`${apiUrl}/users/${id}/`, data, { headers: headers() })
      .then((response) => {
        dispatch({
          type: ActionTypes.USER_DETAILS_UPDATE_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error.response);
        dispatch({
          type: ActionTypes.USER_DETAILS_UPDATE_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};

export const fetchPeople = (id) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.PEOPLE_DETAILS_FETCH_FAILED });
    return await axios
      .get(`${apiUrl}/users`, { params: { username: id }, headers: headers() })
      .then((response) => {
        dispatch({
          type: ActionTypes.PEOPLE_DETAILS_FETCH_SUCCESS,
          data: response.data.results[0],
        });
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.PEOPLE_DETAILS_FETCH_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};
