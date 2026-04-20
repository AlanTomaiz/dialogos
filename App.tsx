import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { useAppFonts } from './src/hooks/useAppFonts';
import { usePushNotifications } from './src/hooks/usePushNotifications';
import { BottomTabNavigator } from './src/libs/navigation';

SplashScreen.preventAutoHideAsync();

export default function App() {
    const fontsLoaded = useAppFonts();
    usePushNotifications();

    if (!fontsLoaded) return null;

    return (
        <NavigationContainer>
            <BottomTabNavigator />
        </NavigationContainer>
    );
}
