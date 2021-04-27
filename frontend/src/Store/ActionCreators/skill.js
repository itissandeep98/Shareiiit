import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = {
  Authorization: "Token " + getAuthToken(),
};

export const createSkillPost = (data) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.SKILL_CREATE_REQUEST });
    return await axios
      .post(`${apiUrl}/myskills/`, data, { headers })
      .then((response) => {
        dispatch({
          type: ActionTypes.SKILL_CREATE_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.SKILL_CREATE_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};

export const fetchSkillPosts = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.SKILL_POSTS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/skills/`, { headers })
      .then((response) => {
        dispatch({
          type: ActionTypes.SKILL_POSTS_FETCH_SUCCESS,
          data: response.data.results,
        });
        return response.data.results;
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.SKILL_POSTS_FETCH_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};

export const fetchUserSkills = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.USER_SKILLS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/myskills/`, { headers })
      .then((response) => {
        dispatch({
          type: ActionTypes.USER_SKILLS_FETCH_SUCCESS,
          data: response.data.results,
        });
        return response.data.results;
      })
      .catch((error) => {
        dispatch({
          type: ActionTypes.USER_SKILLS_FETCH_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};
