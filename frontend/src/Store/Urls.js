export const apiUrl =
	process.env.NODE_ENV === 'production'
		? 'http://share.fh.iiitd.edu.in'
		: ' http://127.0.0.1:8000';
