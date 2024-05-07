//firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyAQoPUVj_M3cvvUqAGDdLxCrrEh6geIV5U",
  authDomain: "push-notifications-54dad.firebaseapp.com",
  databaseURL: "https://push-notifications-54dad-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "push-notifications-54dad",
  storageBucket: "push-notifications-54dad.appspot.com",
  messagingSenderId: "869369389686",
  appId: "1:869369389686:web:250b9b9ca8a96da4c5f557",
  measurementId: "G-91Z0GZC29V"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  try {
    const { notification } = payload;
    if (!notification || !notification.title || !notification.body) {
      throw new Error("Invalid notification payload.");
    }

    const notificationTitle = notification.title;
    const notificationOptions = {
      body: notification.body,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
  } catch (error) {
    console.error("Error displaying notification:", error);
  }
});
