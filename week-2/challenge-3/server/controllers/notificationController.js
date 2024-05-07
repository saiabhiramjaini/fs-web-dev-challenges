const { admin, deviceTokensRef } = require("../config/firebase");

const sendPushNotification = (deviceToken, notification) => {
  const message = {
    notification: {
      title: notification.title,
      body: notification.body,
    },
    token: deviceToken,
  };

  // Check if device token exists before sending notification
  if (deviceToken) {
    admin
      .messaging()
      .send(message)
      .then((response) => {
        console.log("Push notification sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending push notification:", error);
      });
  } else {
    console.error("Invalid device token:", deviceToken);
  }
};

const sendNotification = (req, res) => {
  const notification = {
    title: req.body.title,
    body: req.body.body,
  };

  deviceTokensRef
    .once("value")
    .then((snapshot) => {
      const deviceTokens = snapshot.val();
      if (deviceTokens) {
        Object.keys(deviceTokens).forEach((token) => {
          sendPushNotification(token, notification);
        });
        res.status(200).send('Push notifications sent successfully');
      } else {
        console.error("No device tokens found in the database");
        res.status(404).send('No device tokens found');
      }
    })
    .catch((error) => {
      console.error("Error fetching device tokens:", error);
      res.status(500).send('Error fetching device tokens');
    });
};

module.exports = { sendNotification };