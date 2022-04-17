import firebase from 'firebase/app';
import 'firebase/messaging';
require('firebase/storage');
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';

var firebaseConfig = {
	apiKey: 'AIzaSyCVqYfMUIyBlRqE4S3d-0z3KetkAxG9Pj0',
	authDomain: 'rsplat-dde9e.firebaseapp.com',
	projectId: 'rsplat-dde9e',
	storageBucket: 'rsplat-dde9e.appspot.com',
	messagingSenderId: '107586975868',
	appId: '1:107586975868:web:ad9a36ec530ce1fb4071f9',
};

const fire = firebase.initializeApp(firebaseConfig);
export const messaging = firebase.messaging();
export const storage = firebase.storage();
export default fire;

export const getTok = () => {
	return messaging
		.getToken(messaging, { vapidKey: '107586975868' })
		.then(currentToken => {
			if (currentToken) {
				console.log('current token for client: ', currentToken);
				// setTokenFound(true);
				// Track the token -> client mapping, by sending to backend server
				// show on the UI that permission is secured
			} else {
				console.log(
					'No registration token available. Request permission to generate one.'
				);
				// setTokenFound(false);
				// shows on the UI that permission is required
			}
		})
		.catch(err => {
			console.log('An error occurred while retrieving token. ', err);
			// catch error while creating client token
		});
};

export const onMessageListener = () =>
	messaging.onMessage(payload => {
		console.log(payload);
	});
