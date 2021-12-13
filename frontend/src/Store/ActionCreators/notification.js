import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = () => ({
	Authorization: "Token " + getAuthToken(),
});

export const fetchNotification = () => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.NOTIFICATION_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/notifications/`, { headers: headers() })
			.then((response) => {
				dispatch({
					type: ActionTypes.NOTIFICATION_FETCH_SUCCESS,
					data: response.data.results,
				});
				return response.data.results;
			})
			.catch((error) => {
				dispatch({
					type: ActionTypes.NOTIFICATION_FETCH_FAILED,
					errmess: "Error in connection with Server",
				});
			});
	};
};

export const updateNotification = (id) => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.NOTIFICATION_UPDATE_REQUEST });
		return await axios
			.patch(
				`${apiUrl}/api/notifications/${id}/`,
				{
					read: true,
				},
				{ headers: headers() }
			)
			.then((response) => {
				dispatch({
					type: ActionTypes.NOTIFICATION_UPDATE_SUCCESS,
				});
			})
			.catch((error) => {
				dispatch({
					type: ActionTypes.NOTIFICATION_UPDATE_FAILED,
					errmess: "Error in connection with Server",
				});
			});
	};
};
