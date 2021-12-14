import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = () => ({
	Authorization: "Token " + getAuthToken(),
});

export const createSkillPost = (data) => {
	console.log(data);
	return async (dispatch) => {
		dispatch({ type: ActionTypes.SKILL_CREATE_REQUEST });
		return await axios
			.post(`${apiUrl}/api/myposts/?category=skill`, data, {
				headers: headers(),
			})
			.then((response) => {
				dispatch({
					type: ActionTypes.SKILL_CREATE_SUCCESS,
					data: response.data,
				});
				return response.data;
			});
		// .catch((error) => {
		//   dispatch({
		//     type: ActionTypes.SKILL_CREATE_FAILED,
		//     errmess: error.response,
		//   });
		// });
	};
};

export const fetchSkillPosts = () => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.SKILL_POSTS_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/posts/?category=skill`, { headers: headers() })
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
			.get(`${apiUrl}/api/myposts/?category=skill`, { headers: headers() })
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

export const fetchSkillList = () => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.SKILL_LIST_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/skilllist/`, { headers: headers() })
			.then((response) => {
				dispatch({
					type: ActionTypes.SKILL_LIST_FETCH_SUCCESS,
					data: response.data.results,
				});
				return response.data.results;
			})
			.catch((error) => {
				dispatch({
					type: ActionTypes.SKILL_LIST_FETCH_FAILED,
					errmess: "Error in connection with Server",
				});
			});
	};
};

export const searchSkillList = (term) => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.SKILL_LIST_SEARCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/skilllist/?search=${term}`, { headers: headers() })
			.then((response) => {
				dispatch({
					type: ActionTypes.SKILL_LIST_SEARCH_SUCCESS,
					data: response.data.results,
				});
				return response.data.results;
			})
			.catch((error) => {
				dispatch({
					type: ActionTypes.SKILL_LIST_SEARCH_FAILED,
					errmess: "Error in connection with Server",
				});
			});
	};
};

export const deleteSkillPost = (id) => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.SKILL_POST_DELETE_REQUEST });
		return await axios
			.delete(`${apiUrl}/api/myskills/${id}/`, { headers: headers() })
			.then((response) => {
				dispatch({
					type: ActionTypes.SKILL_POST_DELETE_SUCCESS,
					data: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: ActionTypes.SKILL_POST_DELETE_FAILED,
					errmess: "Error in connection with Server",
				});
			});
	};
};

export const updateSkillPost = ({ id, body }) => {
	console.log(body);
	return async (dispatch) => {
		dispatch({ type: ActionTypes.SKILL_CREATE_REQUEST });
		return await axios
			.patch(`${apiUrl}/api/myskills/${id}/`, body, { headers: headers() })
			.then((response) => {
				dispatch({
					type: ActionTypes.SKILL_CREATE_SUCCESS,
					data: response.data,
				});
			});
		// .catch((error) => {
		//   dispatch({
		//     type: ActionTypes.SKILL_CREATE_FAILED,
		//     errmess: error.response,
		//   });
		// });
	};
};
