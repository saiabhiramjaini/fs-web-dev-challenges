// import React, { useState, useEffect } from 'react';
// import { messaging, database } from '../firebase';

// export const HomePage = () => {
//   const [permission, setPermission] = useState(null);
//   const [notifications, setNotifications] = useState([]);

// const checkNotificationPermission = () => {
//   if (!("Notification" in window)) {
//     console.log("Notifications not supported in this browser");
//     return;
//   }

//   if (Notification.permission === "granted") {
//     console.log("Notification permission granted");
//   } else if (Notification.permission === "denied") {
//     console.log("Notification permission denied");
//   } else {
//     console.log("Notification permission not yet requested");
//   }
// };

// // Call the function to check permission status
// checkNotificationPermission();


//   useEffect(() => {
//     const handlePermission = async () => {
//       try {
//         const permission = await Notification.requestPermission();
//         setPermission(permission);
//         if (permission === 'granted') {
//           const token = await messaging.getToken();
//           console.log("Device token:", token);
//           storeDeviceToken(token);
//         }
//       } catch (error) {
//         console.error('Error requesting permission:', error);
//       }
//     };

//     const handleNotification = (payload) => {
//       // Add the received notification to the state
//       setNotifications(prevNotifications => [...prevNotifications, payload.notification]);
//     };

//     messaging.onMessage(handleNotification);

//     handlePermission();

//     // No cleanup needed in this case

//   }, []);

//   const storeDeviceToken = async (deviceToken) => {
//     try {
//       await database.ref(`deviceTokens/${deviceToken}`).set(true);
//     } catch (error) {
//       console.error('Error storing device token:', error);
//     }
//   };

//   return (
//     <div>
//       {permission === 'granted' ? (
//         <div>
//           <p>Listening for push notifications...</p>
//           {/* Render the list of notifications */}
//           {notifications.map((notification, index) => (
//             <div key={index}>
//               <p>{notification.title}</p>
//               <p>{notification.body}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Requesting permission to send push notifications...</p>
//       )}
//     </div>
//   );
// };



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { messaging, database } from '../firebase';
import '../App.css'

export const HomePage = () => {
  const [permission, setPermission] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const checkNotificationPermission = () => {
    if (!('Notification' in window)) {
      console.log('Notifications not supported in this browser');
      return;
    }
    if (Notification.permission === 'granted') {
      console.log('Notification permission granted');
    } else if (Notification.permission === 'denied') {
      console.log('Notification permission denied');
    } else {
      console.log('Notification permission not yet requested');
    }
  };

  // Call the function to check permission status
  checkNotificationPermission();

  useEffect(() => {
    const handlePermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        setPermission(permission);
        if (permission === 'granted') {
          const token = await messaging.getToken();
          console.log('Device token:', token);
          storeDeviceToken(token);
        }
      } catch (error) {
        console.error('Error requesting permission:', error);
      }
    };

    const handleNotification = (payload) => {
      // Add the received notification to the state
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        payload.notification,
      ]);
    };

    messaging.onMessage(handleNotification);
    handlePermission();
    // No cleanup needed in this case
  }, []);

  const storeDeviceToken = async (deviceToken) => {
    try {
      await database.ref(`deviceTokens/${deviceToken}`).set(true);
    } catch (error) {
      console.error('Error storing device token:', error);
    }
  };

  const sendNotificationToServer = async () => {
    try {
      console.log(title, body);
      const response = await axios.post('http://localhost:8080/send-notification', { title, body }, {
      });
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error sending notification to server:', error);
    }
  };

  return (
    <div className="notification-form">
    <input
      className="notification-input"
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
    <input
      className="notification-input"
      type="text"
      placeholder="Body"
      value={body}
      onChange={(e) => setBody(e.target.value)}
    />
    <button className="notification-button" onClick={sendNotificationToServer}>
      Send Notification to Server
    </button>
  </div>
  
  );
};