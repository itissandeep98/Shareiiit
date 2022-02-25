export const apiUrl =
	process.env.NODE_ENV === 'production'
		? 'https://resource-sharing-app.herokuapp.com'
		: ' http://127.0.0.1:8000';
