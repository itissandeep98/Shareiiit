import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = () => ({
	Authorization: "Token " + getAuthToken(),
});

export const fetchPeople = (user) => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.PEOPLE_DETAILS_FETCH_FAILED });
		return await axios
			.get(`${apiUrl}/api/users/${user}/`, {
				headers: headers(),
			})
			.then((response) => {
				const data = response.data;
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
			.get(`${apiUrl}/api/posts`, {
				params: { category: "skill", username: user },
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
