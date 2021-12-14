import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = () => ({
	Authorization: "Token " + getAuthToken(),
});

export const searchBooks = (data) => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.BOOK_SEARCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/myposts/?category=book&`, {
				params: data,
				headers: headers(),
			})
			.then((response) => {
				dispatch({
					type: ActionTypes.BOOK_SEARCH_SUCCESS,
					data: response.data.results,
				});
				return response.data.results;
			})
			.catch((error) => {
				console.log(error);
				dispatch({
					type: ActionTypes.BOOK_SEARCH_FAILED,
					errmess: "Error in connection with Server",
				});
			});
	};
};

export const searchAdvanced = (data) => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.SEARCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/myposts/?category=book&`, {
				params: data,
				headers: headers(),
			})
			.then((response) => {
				dispatch({
					type: ActionTypes.SEARCH_SUCCESS,
					data: response.data.results,
				});
				return response.data.results;
			})
			.catch((error) => {
				console.log(error);
				dispatch({
					type: ActionTypes.SEARCH_FAILED,
					errmess: "Error in connection with Server",
				});
			});
	};
};

export const searchSkills = (data) => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.SKILL_SEARCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/skills/`, { params: data, headers: headers() })
			.then((response) => {
				dispatch({
					type: ActionTypes.SKILL_SEARCH_SUCCESS,
					data: response.data.results,
				});
				return response.data.results;
			})
			.catch((error) => {
				console.log(error);
				dispatch({
					type: ActionTypes.SKILL_SEARCH_FAILED,
					errmess: "Error in connection with Server",
				});
			});
	};
};
