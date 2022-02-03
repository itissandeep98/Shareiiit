import * as ActionTypes from '../ActionTypes';

const initState = {
	isLoading: false,
	next: null,
};

export const postReducer = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.POST_FETCH_REQUEST:
			return { ...state, errmess: null, isLoading: true };

		case ActionTypes.POST_FETCH_SUCCESS:
			return {
				...state,
				errmess: null,
				[action.category]: action.data,
				next: action.next,
				isLoading: false,
			};

		case ActionTypes.POST_NEXT_FETCH_SUCCESS:
			return {
				...state,
				errmess: null,
				[action.category]: [...state[action.category], ...action.data],
				next: action.next,
				isLoading: false,
			};

		case ActionTypes.POST_FETCH_FAILED:
			return {
				...state,
				errmess: action.errmess,
				[action.category]: null,
				isLoading: false,
			};

		default:
			return state;
	}
};
