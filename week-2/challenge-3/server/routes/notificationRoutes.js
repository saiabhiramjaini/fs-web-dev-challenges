const express = require('express');
const router = express.Router();
const { sendNotification } = require('../controllers/notificationController');

router.post('/send-notification', sendNotification);

module.exports = router;

// const admin = require("firebase-admin");
// const serviceAccount = require("./push-notifications-54dad-firebase-adminsdk-4iqr6-cdf3af164c.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL:
//     "https://push-notifications-54dad-default-rtdb.asia-southeast1.firebasedatabase.app/",
// });
// const database = admin.database();
// const deviceTokensRef = database.ref("deviceTokens"); // Function to send push notification to a specific device token
// const sendPushNotification = (deviceToken, notification) => {
//   const message = {
//     notification: { title: notification.title, body: notification.body },
//     token: deviceToken,
//   }; // Check if device token exists before sending notification
//   if (deviceToken) {
//     admin
//       .messaging()
//       .send(message)
//       .then((response) => {
//         console.log("Push notification sent successfully:", response);
//       })
//       .catch((error) => {
//         console.error("Error sending push notification:", error);
//       });
//   } else {
//     console.error("Invalid device token:", deviceToken);
//   }
// };
// const notification = {
//   title: "Placement Notification",
//   body: "Recruitments have begun.",
// };
// deviceTokensRef
//   .once("value")
//   .then((snapshot) => {
//     const deviceTokens = snapshot.val();
//     if (deviceTokens) {
//       Object.keys(deviceTokens).forEach((token) => {
//         sendPushNotification(token, notification);
//       });
//     } else {
//       console.error("No device tokens found in the database");
//     }
//   })
//   .catch((error) => {
//     console.error("Error fetching device tokens:", error);
//   });
