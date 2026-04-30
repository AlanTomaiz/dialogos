import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import AppSplashScreen from './AppSplashScreen';

SplashScreen.preventAutoHideAsync();

const MIN_DISPLAY_MS = 500;

type SplashGateProps = {
  ready: boolean;
  children: React.ReactNode;
};

export function SplashGate({ ready, children }: SplashGateProps) {
  const [minElapsed, setMinElapsed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => setMinElapsed(true), MIN_DISPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (ready && minElapsed) {
      SplashScreen.hideAsync();
    }
  }, [ready, minElapsed]);

  if (!ready || !minElapsed) {
    return <AppSplashScreen />;
  }

  return <View style={{ flex: 1 }}>{children}</View>;
}
