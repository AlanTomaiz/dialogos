import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';

export const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND_NOTIFICATION_TASK';

TaskManager.defineTask<{ notification: Notifications.Notification }>(
  BACKGROUND_NOTIFICATION_TASK,
  ({ data, error }) => {
    if (error) {
      console.error('[BackgroundNotification] erro na task:', error);
      return;
    }
    if (data?.notification) {
      console.log('[BackgroundNotification] recebida em background:', data.notification);
    }
  }
);

export async function registerBackgroundNotificationTask(): Promise<void> {
  const isRegistered = await TaskManager.isTaskRegisteredAsync(
    BACKGROUND_NOTIFICATION_TASK
  );

  if (!isRegistered) {
    await Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
  }
}
