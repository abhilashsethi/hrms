import { getToken, onMessage } from "@firebase/messaging";
import { useEffect } from "react";
import { useChange } from "./useAPI";
import { VAPID_KEY, messaging } from "config";

const useFCMToken = (uid: string | undefined) => {
  const { change } = useChange();
  useEffect(() => {
    const isSupported = () =>
      "Notification" in window &&
      "serviceWorker" in navigator &&
      "PushManager" in window;
    if (isSupported()) {
      Notification.requestPermission(async function (permission) {
        const messagingResolver = await messaging;
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          if (uid) {
            // Get FCM Token
            await getToken(messagingResolver, {
              vapidKey: VAPID_KEY,
            })
              .then(async (fcmToken) => {
                if (fcmToken) {
                  try {
                    const resData = {web:fcmToken}
                   const result= await change(`users/${uid}`, {
                      method: "PATCH",
                      body: {fcmTokens: resData}     
                   });
                  } catch (err) {
                    console.log(err)
                  }
                } else {
                }
              })
              .catch(console.log);
          }
        } else if (
          Notification.permission === "denied" ||
          Notification.permission === "default"
        ) {
          console.log("Permission not granted");
          Notification.requestPermission();
        }
      });
    }
  }, [uid]);
};

export const onMessageListener = async () =>
  new Promise((resolve) =>
    (async () => {
      const messagingResolve = await messaging;
      onMessage(messagingResolve, (payload) => {
        resolve(payload);
      });
    })()
  );

export default useFCMToken;
