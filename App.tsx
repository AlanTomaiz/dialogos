import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashGate } from './src/components/AppSplashScreen/SplashGate';
import { Toast } from './src/components/toast';
import { useAppFonts } from './src/hooks/useAppFonts';
import { usePushNotifications } from './src/hooks/usePushNotifications';
import { ToastProvider, useToast } from './src/hooks/useToast';
import { useUserStatusWatcher } from './src/hooks/useUserStatusWatcher';
import { auth } from './src/libs/firebase';
import { Home } from './src/screens/Home';
import { Login } from './src/screens/Login';
import { Profile } from './src/screens/Profile';
import { SignUp } from './src/screens/SignUp';
import { getUserStatusByUid } from './src/services/authService';

type AppScreen = 'login' | 'signup' | 'home' | 'profile';

function GlobalToastLayer() {
  const toast = useToast();
  return <Toast toasts={toast.toasts} onHide={toast.hide} />;
}

type AppContentProps = {
  fontsLoaded: boolean;
};

function AppContent({ fontsLoaded }: AppContentProps) {
  usePushNotifications();
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('login');
  const [isAuthResolved, setIsAuthResolved] = useState(false);
  const [authenticatedUid, setAuthenticatedUid] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setCurrentScreen('login');
        setAuthenticatedUid(null);
        setIsAuthResolved(true);
        return;
      }

      const status = await getUserStatusByUid(user.uid);

      if (status === 'INACTIVE') {
        await signOut(auth);
        setCurrentScreen('login');
        setAuthenticatedUid(null);
        setIsAuthResolved(true);
        return;
      }

      setAuthenticatedUid(user.uid);
      setCurrentScreen('home');
      setIsAuthResolved(true);
    });

    return unsubscribe;
  }, []);

  useUserStatusWatcher(authenticatedUid, () => {
    setCurrentScreen('login');
    setAuthenticatedUid(null);
  });

  return (
    <SplashGate ready={fontsLoaded && isAuthResolved}>
      {currentScreen === 'home' ? (
        <Home onNavigateToProfile={() => setCurrentScreen('profile')} />
      ) : currentScreen === 'profile' ? (
        <Profile onBack={() => setCurrentScreen('home')} />
      ) : currentScreen === 'login' ? (
        <Login
          onNavigateToSignUp={() => setCurrentScreen('signup')}
          onLoginSuccess={() => setCurrentScreen('home')}
        />
      ) : (
        <SignUp
          onNavigateToLogin={() => setCurrentScreen('login')}
          onSignUpSuccess={() => setCurrentScreen('home')}
        />
      )}
      <GlobalToastLayer />
    </SplashGate>
  );
}

export default function App() {
  const fontsLoaded = useAppFonts();

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <AppContent fontsLoaded={fontsLoaded} />
      </ToastProvider>
    </SafeAreaProvider>
  );
}
