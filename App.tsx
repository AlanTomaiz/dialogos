import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashGate } from './src/components/AppSplashScreen/SplashGate';
import { useAppFonts } from './src/hooks/useAppFonts';
import { usePushNotifications } from './src/hooks/usePushNotifications';
import { Home } from './src/screens/Home';

export default function App() {
    const fontsLoaded = useAppFonts();
    usePushNotifications();

    return (
        <SafeAreaProvider>
            <SplashGate ready={fontsLoaded}>
                <Home />
            </SplashGate>
        </SafeAreaProvider>
    );
}
