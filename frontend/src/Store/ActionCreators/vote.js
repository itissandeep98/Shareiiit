import axios from 'axios';
import { getAuthToken } from '../../Components/checkAuth';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Urls';
const headers = () => ({
	Authorization: 'Token ' + getAuthToken(),
});

export const addVote = ({ id, data }) => {
	return async dispatch => {
		dispatch({ type: ActionTypes.LIKE_ADD_REQUEST, data: data });
		return await axios
			.patch(`${apiUrl}/api/votelog/`, data, {
				params: { post: id },
				headers: headers(),
			})
			.then(response => {
				dispatch({
					type: ActionTypes.LIKE_ADD_SUCCESS,
					data: response.data,
				});
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.LIKE_ADD_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const deleteVote = id => {
	return async dispatch => {
		dispatch({ type: ActionTypes.LIKE_DELETE_REQUEST, id: id });
		return await axios
			.delete(`${apiUrl}/votes/${id}`, { headers: headers() })
			.then(response => {
				dispatch({
					type: ActionTypes.LIKE_DELETE_SUCCESS,
					data: response.data,
				});
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.LIKE_DELETE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const fetchVotedPosts = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.VOTED_POST_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/myactivity`, { params: data, headers: headers() })
			.then(response => {
				dispatch({
					type: ActionTypes.VOTED_POST_FETCH_SUCCESS,
					data: response.data.results,
				});
				return response.data.results;
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.VOTED_POST_FETCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};
