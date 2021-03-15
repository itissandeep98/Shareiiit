export const isLoggedIn = () => sessionStorage.getItem("user_key") !== null;
export const getAuthToken = () => sessionStorage.getItem("user_key");
