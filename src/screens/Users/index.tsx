import { ArrowLeft, Users as UsersIcon } from 'lucide-react-native';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { UserDetailModal } from '../../components/UserDetailModal/UserDetailModal';
import type { UserDetailData } from '../../components/UserDetailModal/UserDetailModal.type';
import type { UserStatus } from '../../services/authService';
import { getAllUsers } from '../../services/userService';
import type { DialUserPublic } from '../../services/userService.type';
import { Colors } from '../../theme';
import { getInitialsFromName } from '../../utils/getInitialsFromName';
import { styles } from './style';

type UsersProps = {
  onBack: () => void;
};

export function Users({ onBack }: UsersProps) {
  const insets = useSafeAreaInsets();
  const [users, setUsers] = useState<DialUserPublic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserDetailData | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch(() => setUsers([]))
      .finally(() => setIsLoading(false));
  }, []);

  const handleUserPress = useCallback((user: DialUserPublic) => {
    setSelectedUser({
      uid: user.uid,
      fullName: user.fullName,
      ra: user.ra,
      email: user.email,
      role: user.role,
      status: user.status
    });
    setIsDetailVisible(true);
  }, []);

  const handleDetailClose = useCallback(() => {
    setIsDetailVisible(false);
    setSelectedUser(null);
  }, []);

  const handleStatusChanged = useCallback(
    (uid: string, newStatus: UserStatus) => {
      setUsers((prev) =>
        prev.map((u) => (u.uid === uid ? { ...u, status: newStatus } : u))
      );
    },
    []
  );

  function renderItem({ item }: { item: DialUserPublic }) {
    const isActive = item.status === 'ACTIVE';
    const initials = getInitialsFromName(item.fullName);

    return (
      <TouchableOpacity
        style={styles.userCard}
        onPress={() => handleUserPress(item)}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`Abrir detalhes de ${item.fullName}`}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.fullName}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            isActive ? styles.statusActive : styles.statusInactive
          ]}
        >
          <Text
            style={
              isActive ? styles.statusActiveText : styles.statusInactiveText
            }
          >
            {isActive ? 'Ativo' : 'Inativo'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={onBack}
          accessibilityLabel="Voltar"
          accessibilityRole="button"
        >
          <ArrowLeft size={24} color={Colors.TITLE} strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <UsersIcon size={18} color={Colors.TITLE} strokeWidth={2.2} />
          <Text style={styles.headerTitle}>Usuários</Text>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator color={Colors.TITLE} />
        </View>
      ) : users.length === 0 ? (
        <View style={styles.emptyState}>
          <UsersIcon size={32} color={Colors.MUTED} strokeWidth={1.5} />
          <Text style={styles.emptyText}>Nenhum usuário encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.uid}
          contentContainerStyle={styles.listContent}
          renderItem={renderItem}
        />
      )}

      <UserDetailModal
        visible={isDetailVisible}
        user={selectedUser}
        onClose={handleDetailClose}
        onStatusChanged={handleStatusChanged}
      />
    </View>
  );
}
