const express = require("express");
const admin = require("firebase-admin");
const serviceAccount = require("./push-notifications-54dad-firebase-adminsdk-4iqr6-cdf3af164c.json");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json()); // Parse JSON request bodies
app.use(cors());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://push-notifications-54dad-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const database = admin.database();
const deviceTokensRef = database.ref("deviceTokens");

// Function to send push notification to a specific device token
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

const notification = {
  title: "req.body.title", // Read title from request body
  body: "req.body.body", // Read body from request body
};

deviceTokensRef
  .once("value")
  .then((snapshot) => {
    const deviceTokens = snapshot.val();
    if (deviceTokens) {
      Object.keys(deviceTokens).forEach((token) => {
        sendPushNotification(token, notification);
      });
    } else {
      console.error("No device tokens found in the database");
    }
  })
  .catch((error) => {
    console.error("Error fetching device tokens:", error);
  });

app.post("/send-notification", (req, res) => {
  try {
    const notification = {
      title: req.body.title, // Read title from request body
      body: req.body.body, // Read body from request body
    };
    
    deviceTokensRef
    .once("value")
    .then((snapshot) => {
      const deviceTokens = snapshot.val();
      if (deviceTokens) {
        Object.keys(deviceTokens).forEach((token) => {
          sendPushNotification(token, notification);
        });
      } else {
        console.error("No device tokens found in the database");
      }
    })
    .catch((error) => {
      console.error("Error fetching device tokens:", error);
    });
  } catch (e) {
    console.log(e);
    //res.status(500).send('Internal Server Error');
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

