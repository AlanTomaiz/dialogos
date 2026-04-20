import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type LocationCoords = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
};

export default function App() {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada. Por favor, habilite nas configurações do dispositivo.');
        setLoading(false);
        return;
      }

      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10,
          timeInterval: 1000,
        },
        (loc) => {
          setLocation(loc.coords);
          setLoading(false);
        }
      );
    })();

    return () => {
      subscription?.remove();
    };
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <ActivityIndicator size="large" color="#4A90E2" />
          <Text style={styles.loadingText}>Obtendo localização...</Text>
        </>
      );
    }

    if (errorMsg) {
      return <Text style={styles.errorText}>{errorMsg}</Text>;
    }

    if (location) {
      return (
        <View style={styles.locationCard}>
          <Text style={styles.title}>Sua Localização</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Latitude</Text>
            <Text style={styles.value}>{location.latitude.toFixed(6)}°</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Longitude</Text>
            <Text style={styles.value}>{location.longitude.toFixed(6)}°</Text>
          </View>
          {location.altitude !== null && (
            <View style={styles.row}>
              <Text style={styles.label}>Altitude</Text>
              <Text style={styles.value}>{location.altitude.toFixed(1)} m</Text>
            </View>
          )}
          {location.accuracy !== null && (
            <View style={styles.row}>
              <Text style={styles.label}>Precisão</Text>
              <Text style={styles.value}>± {location.accuracy.toFixed(1)} m</Text>
            </View>
          )}
          {location.speed !== null && location.speed > 0 && (
            <View style={styles.row}>
              <Text style={styles.label}>Velocidade</Text>
              <Text style={styles.value}>{(location.speed * 3.6).toFixed(1)} km/h</Text>
            </View>
          )}
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.appTitle}>Dialogos</Text>
      <Text style={styles.appSubtitle}>Gerenciador de Eventos</Text>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A2E',
    letterSpacing: 1,
    marginBottom: 4,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 40,
    letterSpacing: 0.5,
  },
  locationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  value: {
    fontSize: 14,
    color: '#1A1A2E',
    fontWeight: '600',
    fontVariant: ['tabular-nums'],
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    color: '#6B7280',
  },
  errorText: {
    fontSize: 15,
    color: '#EF4444',
    textAlign: 'center',
    lineHeight: 22,
  },
});
