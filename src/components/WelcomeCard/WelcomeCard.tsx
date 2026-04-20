import { Search } from 'lucide-react-native';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

type WelcomeCardProps = {
  userName: string;
};

export function WelcomeCard({ userName }: WelcomeCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.illustrationArea}>
        <TouchableOpacity style={styles.searchButton} activeOpacity={0.8}>
          <Search size={20} color="#1B5E3B" strokeWidth={2} />
        </TouchableOpacity>
      </View>
      <View style={styles.textArea}>
        <Text style={styles.title}>Olá</Text>
        <Text style={styles.subtitle}>bem vindo, {userName}</Text>
      </View>
    </View>
  );
}
