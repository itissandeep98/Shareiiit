import axios from 'axios';
import { getAuthToken } from '../../Components/checkAuth';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Urls';

const headers = () => ({
	Authorization: 'Token ' + getAuthToken(),
});

export const fetchNotification = () => {
	return async dispatch => {
		dispatch({ type: ActionTypes.NOTIFICATION_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/notifications/`, { headers: headers() })
			.then(response => {
				const { results, next } = response.data;

				dispatch({
					type: ActionTypes.NOTIFICATION_FETCH_SUCCESS,
					data: results,
					next,
				});
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.NOTIFICATION_FETCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const fetchNextNotification = next => {
	return async dispatch => {
		dispatch({ type: ActionTypes.NOTIFICATION_NEXT_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/notifications/?page=${next}`, { headers: headers() })
			.then(response => {
				const { results, next } = response.data;

				dispatch({
					type: ActionTypes.NOTIFICATION_NEXT_FETCH_SUCCESS,
					data: results,
					next,
				});
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.NOTIFICATION_NEXT_FETCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const updateNotification = id => {
	return async dispatch => {
		dispatch({ type: ActionTypes.NOTIFICATION_UPDATE_REQUEST });
		return await axios
			.patch(
				`${apiUrl}/api/notifications/${id}/`,
				{
					read: true,
				},
				{ headers: headers() }
			)
			.then(response => {
				dispatch({
					type: ActionTypes.NOTIFICATION_UPDATE_SUCCESS,
				});
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.NOTIFICATION_UPDATE_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};
