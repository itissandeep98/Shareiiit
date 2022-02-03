import axios from 'axios';
import { getAuthToken } from '../../Components/checkAuth';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Urls';

const headers = () => ({
	Authorization: 'Token ' + getAuthToken(),
});

export const fetchPeople = user => {
	return async dispatch => {
		dispatch({ type: ActionTypes.PEOPLE_DETAILS_FETCH_FAILED });
		return await axios
			.get(`${apiUrl}/api/users/${user}/`, {
				headers: headers(),
			})
			.then(response => {
				const data = response.data;
				dispatch({
					type: ActionTypes.PEOPLE_DETAILS_FETCH_SUCCESS,
					data,
				});
				return data;
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.PEOPLE_DETAILS_FETCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const fetchPeopleSkills = user => {
	return async dispatch => {
		dispatch({ type: ActionTypes.PEOPLE_SKILLS_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/posts`, {
				params: { category: 'skill', username: user },
				headers: headers(),
			})
			.then(response => {
				const data = response.data.results;
				dispatch({
					type: ActionTypes.PEOPLE_SKILLS_FETCH_SUCCESS,
					data,
				});
				return data;
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.PEOPLE_SKILLS_FETCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const followPeople = ({ id }) => {
	return async dispatch => {
		dispatch({ type: ActionTypes.USER_FOLLOW_REQUEST });
		return await axios
			.post(
				`${apiUrl}/api/following/`,
				{ user: id },
				{
					headers: headers(),
				}
			)
			.then(response => {
				dispatch({
					type: ActionTypes.USER_FOLLOW_SUCCESS,
					data: response.data,
				});
			})
			.catch(error => {
				if (error?.response?.data?.detail) {
					dispatch({
						type: ActionTypes.USER_FOLLOW_FAILED,
						errmess: error.response.data.detail,
					});
				} else {
					dispatch({
						type: ActionTypes.USER_FOLLOW_FAILED,
						errmess: error.response,
					});
				}
			});
	};
};

export const unfollowPeople = ({ id }) => {
	return async dispatch => {
		dispatch({ type: ActionTypes.USER_UNFOLLOW_REQUEST });
		return await axios
			.delete(`${apiUrl}/api/following/${id}/`, {
				headers: headers(),
			})
			.then(response => {
				dispatch({
					type: ActionTypes.USER_UNFOLLOW_SUCCESS,
					data: response.data,
				});
			})
			.catch(error => {
				if (error?.response?.data?.detail) {
					dispatch({
						type: ActionTypes.USER_UNFOLLOW_FAILED,
						errmess: error.response.data.detail,
					});
				} else {
					dispatch({
						type: ActionTypes.USER_UNFOLLOW_FAILED,
						errmess: error.response,
					});
				}
			});
	};
};
