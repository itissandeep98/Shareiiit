import axios from 'axios';
import { getAuthToken } from '../../Components/checkAuth';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Urls';

const headers = () => ({
	Authorization: 'Token ' + getAuthToken(),
});

export const searchBooks = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.BOOK_SEARCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/posts/?category=book`, {
				params: data,
				headers: headers(),
			})
			.then(response => {
				dispatch({
					type: ActionTypes.BOOK_SEARCH_SUCCESS,
					data: response.data.results,
				});
				return response.data.results;
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.BOOK_SEARCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const searchPosts = ({ data, category }) => {
	return async dispatch => {
		dispatch({ type: ActionTypes.BOOK_SEARCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/posts/?category=${category}`, {
				params: data,
				headers: headers(),
			})
			.then(response => {
				dispatch({
					type: ActionTypes.BOOK_SEARCH_SUCCESS,
					data: response.data.results,
				});
				return response.data.results;
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.BOOK_SEARCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const searchAdvanced = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.SEARCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/posts/`, {
				params: data,
				headers: headers(),
			})
			.then(response => {
				dispatch({
					type: ActionTypes.SEARCH_SUCCESS,
					data: response.data.results,
				});
				return response.data.results;
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.SEARCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const searchSkills = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.SKILL_SEARCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/posts/?category=skill`, {
				params: data,
				headers: headers(),
			})
			.then(response => {
				dispatch({
					type: ActionTypes.SKILL_SEARCH_SUCCESS,
					data: response.data.results,
				});
				return response.data.results;
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.SKILL_SEARCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const searchUser = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.PEOPLE_SEARCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/users/`, {
				params: data,
				headers: headers(),
			})
			.then(response => {
				const data = response.data;

				dispatch({
					type: ActionTypes.PEOPLE_SEARCH_SUCCESS,
					data: data,
				});
				return data;
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.PEOPLE_SEARCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};
