import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = () => ({
	Authorization: "Token " + getAuthToken(),
});

export const fetchMessages = (data) => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.MESSAGE_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/conversations/`, { params: data, headers: headers() })
			.then((response) => {
				const data = response.data.results;
				dispatch({
					type: ActionTypes.MESSAGE_FETCH_SUCCESS,
					data: data,
				});
				return data;
			})
			.catch((error) => {
				console.log(error);
				dispatch({
					type: ActionTypes.MESSAGE_FETCH_FAILED,
					errmess: "Error in connection with Server",
				});
			});
	};
};

export const createMessage = ({ type, data }) => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.MESSAGE_CREATE_REQUEST });
		return await axios
			.post(`${apiUrl}/api/messages/`, data, {
				params: type,
				headers: headers(),
			})
			.then((response) => {
				dispatch({
					type: ActionTypes.MESSAGE_CREATE_SUCCESS,
					data: response.data,
				});
				return response.data;
			})
			.catch((error) => {
				console.log(error.response);
				dispatch({
					type: ActionTypes.MESSAGE_CREATE_FAILED,
					errmess: "Error in connection with Server",
				});
			});
	};
};
