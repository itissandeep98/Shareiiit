export const apiUrl =
	process.env.NODE_ENV === "production"
		? "http://share.osa.iiitd.edu.in"
		: "https://resource-sharing-app.herokuapp.com";
