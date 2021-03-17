export const isLoggedIn = () => sessionStorage.getItem("user_key") !== null;
export const getAuthToken = () => sessionStorage.getItem("user_key");
export const setAuthToken = (key) => sessionStorage.setItem("user_key", key);
export const removeAuthToken = () => sessionStorage.removeItem("user_key");
