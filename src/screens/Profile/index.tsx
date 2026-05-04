import { ArrowLeft } from 'lucide-react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLoggedUserProfile } from '../../hooks/useLoggedUserProfile';
import { Colors } from '../../theme';
import { getInitialsFromName } from '../../utils/getInitialsFromName';
import { styles } from './style';

type ProfileProps = {
  onBack: () => void;
};

export function Profile({ onBack }: ProfileProps) {
  const insets = useSafeAreaInsets();
  const { fullName, photoURL, role } = useLoggedUserProfile();

  const roleLabel = role === 'ADMIN' ? 'Administrador' : 'Membro';

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
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      <View style={styles.content}>
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

        <Text style={styles.name}>{fullName}</Text>

        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{roleLabel}</Text>
        </View>
      </View>
    </View>
  );
}
