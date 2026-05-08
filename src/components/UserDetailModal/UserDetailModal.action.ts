import { USER_DEACTIVATED_MESSAGE } from '../../config/messages';
import type { UserStatus } from '../../services/authService';
import { sendDeactivationNotification } from '../../services/notificationService';
import { updateUserStatus } from '../../services/userService';
import type { UserStatusUpdateInput } from '../../services/userService.type';

export type ToggleUserStatusResult =
  | { success: true; newStatus: UserStatus }
  | { success: false; error: string };

export async function toggleUserStatus(
  uid: string,
  currentStatus: UserStatus,
  currentUserUid: string
): Promise<ToggleUserStatusResult> {
  if (uid === currentUserUid) {
    return {
      success: false,
      error: 'Você não pode alterar o status da sua própria conta por aqui.'
    };
  }

  const newStatus: UserStatus =
    currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';

  const input: UserStatusUpdateInput = { uid, status: newStatus };
  await updateUserStatus(input);

  if (newStatus === 'INACTIVE') {
    await sendDeactivationNotification(uid).catch(() => {});
  }

  return { success: true, newStatus };
}

export { USER_DEACTIVATED_MESSAGE };
