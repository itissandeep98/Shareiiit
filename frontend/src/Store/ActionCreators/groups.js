import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = () => ({
  Authorization: "Token " + getAuthToken(),
});

export const fetchGroups = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.GROUPS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/groups/`, { headers: headers() })
      .then((response) => {
        dispatch({
          type: ActionTypes.GROUPS_FETCH_SUCCESS,
          data: response.data.results,
        });
        return response.data.results;
      })
      .catch((error) => {
        console.log(error.response);
        dispatch({
          type: ActionTypes.GROUPS_FETCH_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};
