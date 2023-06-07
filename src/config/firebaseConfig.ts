import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyBwCJxo4PJbUyKmqP7AiUTQg_6GB49QKdk",
  authDomain: "sy-hrms.firebaseapp.com",
  databaseURL: "https://sy-hrms-default-rtdb.firebaseio.com",
  projectId: "sy-hrms",
  storageBucket: "sy-hrms.appspot.com",
  messagingSenderId: "130464866257",
  appId: "1:130464866257:web:acb3708a2e91b0db2d4af0",
};
const app: FirebaseApp =
  getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const messaging: any = (async () => {
  try {
    const isSupportedBrowser = await isSupported();
    if (isSupportedBrowser) {
      return getMessaging(app);
    }
    return null;
  } catch (err) {
    return null;
  }
})();
