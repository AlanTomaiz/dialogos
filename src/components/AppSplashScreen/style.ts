import { StyleSheet } from 'react-native';
import { Colors } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SCREENBG,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '80%',
    height: '40%'
  },
  gateContainer: {
    flex: 1
  }
});
