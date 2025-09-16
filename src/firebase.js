// src/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
 apiKey: "AIzaSyC1-UtafTvUJ4xHXpTdCI7HljSVnrNJvYo",
  authDomain: "loginsignup-d3ab9.firebaseapp.com",
  projectId: "loginsignup-d3ab9",
  storageBucket: "loginsignup-d3ab9.firebasestorage.app",
  messagingSenderId: "846863018974",
  appId: "1:846863018974:web:6797c4222a70da3eb5cb4f",
  measurementId: "G-CWR0PZLTR0"
};

// Replace with the Public VAPID key you generated in Firebase Console
const VAPID_PUBLIC_KEY = "BNSiUcIU1OT04HnPmDu129aUPd1nk8_mVy0N5_GWJ6wPj7wiTA1wCU-Z3ZoHIvHMi_FAQr17NiX9SLSdD5lIpYk";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

/**
 * Request notification permission from the user and return FCM token (or null)
 */
export const requestPermissionAndGetToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.log("Notification permission not granted.");
      return null;
    }

    const currentToken = await getToken(messaging, { vapidKey: VAPID_PUBLIC_KEY });
    if (currentToken) {
      console.log("FCM token:", currentToken);
      return currentToken;
    } else {
      console.log("No registration token available. Request permission to generate one.");
      return null;
    }
  } catch (err) {
    console.error("An error occurred while retrieving token. ", err);
    return null;
  }
};

/**
 * Subscribe to foreground messages.
 * callback receives the message payload.
 * Returns an unsubscribe function.
 */
export const onMessageListener = (callback) => {
  const unsubscribe = onMessage(messaging, (payload) => {
    callback(payload);
  });
  return unsubscribe;
};

export default messaging;
