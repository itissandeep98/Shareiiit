export const isLoggedIn = () => localStorage.getItem("user_key") !== null;
export const getAuthToken = () => localStorage.getItem("user_key");
export const setAuthToken = (key) => localStorage.setItem("user_key", key);
export const removeAuthToken = () => localStorage.removeItem("user_key");
