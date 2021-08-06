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
      .get(`${apiUrl}/api/details/`, { headers: headers() })
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
  return async (dispatch) => {
    dispatch({ type: ActionTypes.USER_DETAILS_UPDATE_REQUEST });
    return await axios
      .patch(`${apiUrl}/api/details/`, data, { headers: headers() })
      .then((response) => {
        dispatch({
          type: ActionTypes.USER_DETAILS_UPDATE_SUCCESS,
          data: response.data,
        });
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

export const fetchPeople = (user) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.PEOPLE_DETAILS_FETCH_FAILED });
    return await axios
      .get(`${apiUrl}/api/users`, {
        params: { username: user },
        headers: headers(),
      })
      .then((response) => {
        const data = response.data[0];
        dispatch({
          type: ActionTypes.PEOPLE_DETAILS_FETCH_SUCCESS,
          data,
        });
        return data;
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.PEOPLE_DETAILS_FETCH_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};

export const fetchPeopleSkills = (user) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.PEOPLE_SKILLS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/api/skills`, {
        params: { username: user },
        headers: headers(),
      })
      .then((response) => {
        const data = response.data.results;
        dispatch({
          type: ActionTypes.PEOPLE_SKILLS_FETCH_SUCCESS,
          data,
        });
        return data;
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.PEOPLE_SKILLS_FETCH_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};
