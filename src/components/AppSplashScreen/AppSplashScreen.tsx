import { Image, View } from 'react-native';
import { styles } from './style';

export default function AppSplashScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/splash-logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}
