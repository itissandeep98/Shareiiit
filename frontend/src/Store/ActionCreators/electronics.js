import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = {
  Authorization: "Token " + getAuthToken(),
};

export const fetchElectronics = () => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.ELECTRONICS_FETCH_REQUEST });
    return await axios
      .get(`${apiUrl}/electronics/`, { headers })
      .then((response) => {
        dispatch({
          type: ActionTypes.ELECTRONICS_FETCH_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ActionTypes.ELECTRONICS_FETCH_FAILED,
          errmess: "Error in connection with Server",
        });
      });
  };
};
