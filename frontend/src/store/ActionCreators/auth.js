import * as ActionTypes from "../ActionTypes";
import fire, { provider } from "../../config/fire";

export const loginAction = () => {
  return (dispatch) => {
    dispatch({ type: ActionTypes.LOGIN_REQUEST });

    return fire
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        // console.log(user);
        const custom_user = {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          uid: user.uid,
        };
        dispatch({ type: ActionTypes.LOGIN_SUCCESS, user: custom_user });
      })
      .catch((error) => {
        // console.log(error);
        dispatch({ type: ActionTypes.LOGIN_FAILED, errmess: error.message });
      });
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    return fire
      .auth()
      .signOut()
      .then((res) => dispatch({ type: ActionTypes.LOGOUT_SUCESS }));
  };
};
