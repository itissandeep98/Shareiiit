import * as ActionTypes from '../ActionTypes';

const initState = {
	isLoading: false,
};

export const notificationReducer = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.NOTIFICATION_FETCH_REQUEST:
			return { ...state, errmess: null, isLoading: true };

		case ActionTypes.NOTIFICATION_FETCH_SUCCESS:
			return {
				...state,
				errmess: null,
				details: action.data,
				next: action.next,
				isLoading: false,
			};
		case ActionTypes.NOTIFICATION_NEXT_FETCH_SUCCESS:
			return {
				...state,
				errmess: null,
				details: [...state.details, ...action.data],
				next: action.next,
				isLoading: false,
			};

		case ActionTypes.NOTIFICATION_FETCH_FAILED:
			return {
				...state,
				errmess: action.errmess,
				details: null,
				isLoading: false,
			};

		default:
			return state;
	}
};
