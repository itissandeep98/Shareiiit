import { configureStore } from "../Store/configureStore";

// export const isLoggedIn = () => localStorage.getItem("user_key") !== null;
export const getAuthToken = () => {
  const key = configureStore?.getState()?.auth?.key;
  return key;
};
// export const setAuthToken = (key) => localStorage.setItem("user_key", key);
// export const removeAuthToken = () => localStorage.removeItem("user_key");
