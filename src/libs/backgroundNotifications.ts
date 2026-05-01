import * as Notifications from 'expo-notifications';

export async function registerBackgroundNotificationTask(): Promise<void> {
  Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true
      };
    }
  });
}
