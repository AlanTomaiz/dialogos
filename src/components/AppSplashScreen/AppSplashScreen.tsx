import { Image, StyleSheet, View } from 'react-native';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDB640',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '80%',
    height: '40%',
  },
});
