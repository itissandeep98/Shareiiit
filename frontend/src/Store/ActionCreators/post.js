import * as ActionTypes from "../ActionTypes";
import axios from "axios";
import { apiUrl } from "../Urls";
import { getAuthToken } from "../../Components/checkAuth";

const headers = () => ({
	Authorization: "Token " + getAuthToken(),
});

export const fetchPostDetails = ({ id, category }) => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.POST_DETAILS_FETCH_REQUEST });
		return await axios
			.get(
				`${apiUrl}/api/posts/${id}/?category=${category}&show_dismissed=True`,
				{
					headers: headers(),
				}
			)
			.then((response) => {
				dispatch({
					type: ActionTypes.POST_DETAILS_FETCH_SUCCESS,
					data: response.data,
					category,
				});
				return response.data;
			})
			.catch((error) => {
				console.log(error);
				dispatch({
					type: ActionTypes.POST_DETAILS_FETCH_FAILED,
					errmess: "Error in connection with Server",
				});
			});
	};
};

export const fetchPosts = ({ category, ordering, request }) => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.POST_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/posts/`, {
				params: {
					category: category,
					ordering: ordering,
					isrequest: request,
				},
				headers: headers(),
			})
			.then((response) => {
				const data = response.data.results;
				dispatch({
					type: ActionTypes.POST_FETCH_SUCCESS,
					data: data,
					category,
				});
				return data;
			})
			.catch((error) => {
				console.log(error);
				dispatch({
					type: ActionTypes.POST_FETCH_FAILED,
					errmess: "Error in connection with Server",
				});
			});
	};
};

export const createPost = ({ data, category }) => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.POST_CREATE_REQUEST });
		return await axios
			.post(`${apiUrl}/api/myposts/?category=${category}`, data, {
				headers: headers(),
			})
			.then((response) => {
				dispatch({
					type: ActionTypes.POST_CREATE_SUCCESS,
					data: response.data,
					category,
				});
			})
			.catch((error) => {
				console.log(error.response);
				if (error?.response?.data?.detail) {
					dispatch({
						type: ActionTypes.POST_CREATE_FAILED,
						errmess: error.response.data.detail,
					});
				} else {
					dispatch({
						type: ActionTypes.POST_CREATE_FAILED,
						errmess: "Error in connection with Server",
					});
				}
			});
	};
};

export const fetchMyPosts = ({ category }) => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.USER_POST_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/myposts/?category=${category}`, {
				headers: headers(),
			})
			.then((response) => {
				dispatch({
					type: ActionTypes.USER_POST_FETCH_SUCCESS,
					data: response.data.results,
					category: category,
				});
				return response.data.results;
			})
			.catch((error) => {
				console.log(error);
				dispatch({
					type: ActionTypes.USER_POST_FETCH_FAILED,
					errmess: "Error in connection with Server",
				});
			});
	};
};

export const deletePost = (id) => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.POST_DELETE_REQUEST });
		return await axios
			.delete(`${apiUrl}/api/myposts/${id}/`, { headers: headers() })
			.then((response) => {
				dispatch({
					type: ActionTypes.POST_DELETE_SUCCESS,
					data: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: ActionTypes.POST_DELETE_FAILED,
					errmess: "Error in connection with Server",
				});
			});
	};
};

export const updatePost = ({ id, data }) => {
	return async (dispatch) => {
		dispatch({ type: ActionTypes.POST_UPDATE_REQUEST });
		return await axios
			.patch(`${apiUrl}/api/myposts/${id}/?category=book`, data, {
				headers: headers(),
			})
			.then((response) => {
				dispatch({
					type: ActionTypes.POST_UPDATE_SUCCESS,
					data: response.data,
				});
			})
			.catch((error) => {
				console.log(error.response);
				if (error?.response?.data?.detail) {
					dispatch({
						type: ActionTypes.POST_UPDATE_FAILED,
						errmess: error.response.data.detail,
					});
				} else {
					dispatch({
						type: ActionTypes.POST_UPDATE_FAILED,
						errmess: "Error in connection with Server",
					});
				}
			});
	};
};
