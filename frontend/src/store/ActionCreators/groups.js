import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = {
  Authorization: "Token " + getAuthToken(),
};

export const fetchGroups = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GROUPS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/groups/`, headers)
      .then((response) => {
        dispatch({
          type: ActionTypes.GROUPS_FETCH_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ActionTypes.GROUPS_FETCH_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};