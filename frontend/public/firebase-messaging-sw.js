importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// importScripts(
// 	'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js'
// );
// importScripts(
// 	'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
// );

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
	apiKey: 'AIzaSyCVqYfMUIyBlRqE4S3d-0z3KetkAxG9Pj0',
	authDomain: 'rsplat-dde9e.firebaseapp.com',
	projectId: 'rsplat-dde9e',
	storageBucket: 'rsplat-dde9e.appspot.com',
	messagingSenderId: '107586975868',
	appId: '1:107586975868:web:ad9a36ec530ce1fb4071f9',
	measurementId: 'G-GRKLL5219P',
};
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	console.log('Received background message ', payload);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
