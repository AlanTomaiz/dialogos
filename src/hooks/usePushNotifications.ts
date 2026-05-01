import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { registerBackgroundNotificationTask } from '../libs/backgroundNotifications';
import { auth } from '../libs/firebase';
import {
  addNotificationReceivedListener,
  addNotificationResponseListener,
  getExpoPushToken
} from '../libs/notifications';
import { saveUserPushToken } from '../services/notificationService';

type UsePushNotificationsResult = {
  expoPushToken: string | null;
  lastNotification: Notifications.Notification | null;
  lastResponse: Notifications.NotificationResponse | null;
};

export function usePushNotifications(): UsePushNotificationsResult {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);
  const [lastNotification, setLastNotification] =
    useState<Notifications.Notification | null>(null);
  const [lastResponse, setLastResponse] =
    useState<Notifications.NotificationResponse | null>(null);

  const notificationListener = useRef<Notifications.EventSubscription | null>(
    null
  );
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    if (Platform.OS === 'web') {
      return;
    }

    registerBackgroundNotificationTask();
    getExpoPushToken().then((token) => {
      setExpoPushToken(token);
      const uid = auth.currentUser?.uid;
      if (token && uid) {
        saveUserPushToken(uid, token).catch(() => {});
      }
    });

    notificationListener.current = addNotificationReceivedListener(
      (notification) => setLastNotification(notification)
    );

    responseListener.current = addNotificationResponseListener((response) =>
      setLastResponse(response)
    );

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return { expoPushToken, lastNotification, lastResponse };
}
