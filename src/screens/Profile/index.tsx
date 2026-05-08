import {
  ArrowLeft,
  ChevronRight,
  LogOut,
  Settings,
  Trash2
} from 'lucide-react-native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AUTH_DEACTIVATE_FAILED,
  AUTH_SIGN_OUT_FAILED
} from '../../config/messages';
import { useLoggedUserProfile } from '../../hooks/useLoggedUserProfile';
import { useToast } from '../../hooks/useToast';
import {
  deactivateCurrentUserAccount,
  signOutCurrentUser
} from '../../services/authService';
import { Colors } from '../../theme';
import { getInitialsFromName } from '../../utils/getInitialsFromName';
import { styles } from './style';

type ProfileProps = {
  onBack: () => void;
};

export function Profile({ onBack }: ProfileProps) {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const { fullName, photoURL, role } = useLoggedUserProfile();
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const roleLabel = role === 'ADMIN' ? 'Administrador' : 'Membro';

  async function handleSignOut(): Promise<void> {
    try {
      setIsSigningOut(true);
      await signOutCurrentUser();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : AUTH_SIGN_OUT_FAILED;

      toast.show(message, 'error');
    } finally {
      setIsSigningOut(false);
    }
  }

  async function handleDeleteAccount(): Promise<void> {
    try {
      setIsDeletingAccount(true);
      await deactivateCurrentUserAccount();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : AUTH_DEACTIVATE_FAILED;

      toast.show(message, 'error');
    } finally {
      setIsDeletingAccount(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity
          style={styles.headerBackButton}
          onPress={onBack}
          accessibilityLabel="Voltar para a tela principal"
          accessibilityRole="button"
        >
          <ArrowLeft size={24} color={Colors.TITLE} strokeWidth={2} />
        </TouchableOpacity>
        <View style={styles.headerTitleWrap}>
          <Settings size={18} color={Colors.TITLE} strokeWidth={2.2} />
          <Text style={styles.headerTitle}>Configuracoes</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.profileMainRow}>
            {photoURL ? (
              <Image
                source={{ uri: photoURL }}
                style={styles.avatarPhoto}
                accessibilityLabel={`Foto de ${fullName}`}
              />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarInitials}>
                  {getInitialsFromName(fullName)}
                </Text>
              </View>
            )}

            <View style={styles.profileTextWrap}>
              <Text style={styles.name}>{fullName}</Text>
              <Text style={styles.roleText}>{roleLabel}</Text>
            </View>

            {/* <ChevronRight size={18} color={Colors.MUTED} /> */}
          </View>
        </View>

        <View style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuRow}
            onPress={handleSignOut}
            disabled={isSigningOut || isDeletingAccount}
            accessibilityLabel="Sair da conta"
            accessibilityRole="button"
          >
            <View style={styles.menuRowLeft}>
              <LogOut size={18} color={Colors.SECONDARY} strokeWidth={2} />
              <Text style={styles.menuText}>
                {isSigningOut ? 'Saindo...' : 'Sair'}
              </Text>
            </View>
            {isSigningOut ? (
              <ActivityIndicator size="small" color={Colors.SECONDARY} />
            ) : (
              <ChevronRight size={18} color={Colors.MUTED} />
            )}
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuRow}
            onPress={handleDeleteAccount}
            disabled={isDeletingAccount || isSigningOut}
            accessibilityLabel="Deletar conta"
            accessibilityRole="button"
          >
            <View style={styles.menuRowLeft}>
              <Trash2 size={18} color={Colors.TOAST_ERROR} strokeWidth={2} />
              <Text style={styles.menuDangerText}>
                {isDeletingAccount ? 'Deletando conta...' : 'Deletar conta'}
              </Text>
            </View>
            {isDeletingAccount ? (
              <ActivityIndicator size="small" color={Colors.TOAST_ERROR} />
            ) : (
              <ChevronRight size={18} color={Colors.MUTED} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
