import { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { auth } from '../../libs/firebase';
import { formatRA } from '../../utils/formatRA';
import { getInitialsFromName } from '../../utils/getInitialsFromName';
import { toggleUserStatus } from './UserDetailModal.action';
import type { UserDetailModalProps } from './UserDetailModal.type';
import { styles } from './style';

export function UserDetailModal({
  visible,
  user,
  onClose,
  onStatusChanged
}: UserDetailModalProps) {
  const insets = useSafeAreaInsets();
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return null;
  }

  const isActive = user.status === 'ACTIVE';
  const roleLabel = user.role === 'ADMIN' ? 'Administrador' : 'Membro';
  const initials = getInitialsFromName(user.fullName);
  const currentUserUid = auth.currentUser?.uid ?? '';

  async function handleToggleStatus(): Promise<void> {
    if (isLoading || !user) return;

    setIsLoading(true);

    try {
      const result = await toggleUserStatus(
        user.uid,
        user.status,
        currentUserUid
      );

      if (!result.success) {
        return;
      }

      onStatusChanged(user.uid, result.newStatus);
      onClose();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.handle} />

          <View style={styles.avatarRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{initials}</Text>
            </View>
            <Text style={styles.fullName}>{user.fullName}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>{roleLabel}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>RA</Text>
              <Text style={styles.infoValue}>{formatRA(user.ra)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>E-mail</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status</Text>
              <View
                style={[
                  styles.statusBadge,
                  isActive ? styles.statusActive : styles.statusInactive
                ]}
              >
                <Text
                  style={
                    isActive
                      ? styles.statusActiveText
                      : styles.statusInactiveText
                  }
                >
                  {isActive ? 'Ativo' : 'Inativo'}
                </Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.actionButton,
              isActive ? styles.deactivateButton : styles.reactivateButton,
              isLoading && { opacity: 0.7 }
            ]}
            onPress={handleToggleStatus}
            disabled={isLoading}
            accessibilityRole="button"
            accessibilityLabel={
              isActive ? 'Desativar usuário' : 'Reativar usuário'
            }
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.actionButtonText}>
                {isActive ? 'Desativar' : 'Reativar'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
