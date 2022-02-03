import * as ActionTypes from '../ActionTypes';

const initState = {
	isLoading: false,
};

export const skillReducer = (state = initState, action) => {
	switch (action.type) {
		case ActionTypes.SKILL_POSTS_FETCH_REQUEST:
			return { ...state, errmess: null, isLoading: true };

		case ActionTypes.SKILL_POSTS_FETCH_SUCCESS:
			return {
				...state,
				errmess: null,
				skills: action.data,
				next: action.next,
				isLoading: false,
			};

		case ActionTypes.SKILL_POSTS_NEXT_FETCH_SUCCESS:
			return {
				...state,
				errmess: null,
				skills: [...state.skills, ...action.data],
				next: action.next,
				isLoading: false,
			};
		case ActionTypes.SKILL_POSTS_FETCH_FAILED:
			return {
				...state,
				errmess: action.errmess,
				skills: null,
				isLoading: false,
			};

		default:
			return state;
	}
};
