import axios from 'axios';
import { getAuthToken } from '../../Components/checkAuth';
import { showAlert } from '../../Utils/showAlert';
import * as ActionTypes from '../ActionTypes';
import { apiUrl } from '../Urls';

const headers = () => ({
	Authorization: 'Token ' + getAuthToken(),
	'Content-Type': 'application/json',
});

export const fetchUser = () => {
	return async dispatch => {
		dispatch({ type: ActionTypes.USER_DETAILS_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/profile/`, { headers: headers() })
			.then(response => {
				dispatch({
					type: ActionTypes.USER_DETAILS_FETCH_SUCCESS,
					data: response.data,
				});
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.USER_DETAILS_FETCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const fetchUserOSA = () => {
	return async dispatch => {
		dispatch({ type: ActionTypes.OSA_USER_DETAILS_FETCH_REQUEST });
		return await axios
			.get(`${apiUrl}/api/osadetails/`, { headers: headers() })
			.then(response => {
				dispatch({
					type: ActionTypes.OSA_USER_DETAILS_FETCH_SUCCESS,
					data: response.data,
				});
			})
			.catch(error => {
				dispatch({
					type: ActionTypes.OSA_USER_DETAILS_FETCH_FAILED,
					errmess: 'Error in connection with Server',
				});
			});
	};
};

export const updateUser = data => {
	return async dispatch => {
		dispatch({ type: ActionTypes.USER_DETAILS_UPDATE_REQUEST });
		return await axios
			.patch(`${apiUrl}/api/profile/`, data, { headers: headers() })
			.then(response => {
				dispatch({
					type: ActionTypes.USER_DETAILS_UPDATE_SUCCESS,
					data: response.data,
				});
				showAlert('Updated Succesfully', 'success');

				return response.data;
			})
			.catch(error => {
				showAlert('Update failed', 'error');
				dispatch({
					type: ActionTypes.USER_DETAILS_UPDATE_FAILED,
					errmess: error.response,
				});
			});
	};
};
