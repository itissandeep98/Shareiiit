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
