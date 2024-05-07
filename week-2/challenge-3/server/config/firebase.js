const admin = require("firebase-admin");
const serviceAccount = require("../push-notifications-54dad-firebase-adminsdk-4iqr6-cdf3af164c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://push-notifications-54dad-default-rtdb.asia-southeast1.firebasedatabase.app/",
});

const database = admin.database();
const deviceTokensRef = database.ref("deviceTokens");

module.exports = { admin, deviceTokensRef };