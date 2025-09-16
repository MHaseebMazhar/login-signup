// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.21.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging-compat.js');

// same config as in your src/firebase.js
const firebaseConfig = {
 apiKey: "AIzaSyC1-UtafTvUJ4xHXpTdCI7HljSVnrNJvYo",
  authDomain: "loginsignup-d3ab9.firebaseapp.com",
  projectId: "loginsignup-d3ab9",
  storageBucket: "loginsignup-d3ab9.firebasestorage.app",
  messagingSenderId: "846863018974",
  appId: "1:846863018974:web:6797c4222a70da3eb5cb4f",
  measurementId: "G-CWR0PZLTR0"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const title = (payload.notification && payload.notification.title) || 'Background Message';
  const options = {
    body: (payload.notification && payload.notification.body) || '',
    icon: '/logo192.png' // change to your icon
  };

  self.registration.showNotification(title, options);
});
