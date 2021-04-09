import * as ActionTypes from "../ActionTypes";

const initState = {
  isLoading: false,
};

export const peopleReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.PEOPLE_DETAILS_FETCH_REQUEST:
      return { ...state, errmess: null, isLoading: true };

    case ActionTypes.PEOPLE_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        errmess: null,
        details: action.data,
        isLoading: false,
      };

    case ActionTypes.PEOPLE_DETAILS_FETCH_FAILED:
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
