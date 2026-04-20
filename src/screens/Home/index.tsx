import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, Text, View } from 'react-native';
import { WelcomeCard } from '../../components/WelcomeCard/WelcomeCard';
import { LocationCoords, useLocation } from '../../hooks/useLocation';
import { Colors } from '../../theme';
import { styles } from './style';

function LocationCard({ location }: { location: LocationCoords }) {
    return (
        <View style={styles.locationCard}>
            <Text style={styles.cardTitle}>Sua Localização</Text>
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

export function Home() {
    const { location, errorMsg, loading } = useLocation();

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <WelcomeCard userName="Usuário" />
            <Text style={styles.appTitle}>Dialogos</Text>
            <Text style={styles.appSubtitle}>Gerenciador de Eventos</Text>
            {loading && (
                <>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text style={styles.loadingText}>Obtendo localização...</Text>
                </>
            )}
            {!loading && errorMsg && (
                <Text style={styles.errorText}>{errorMsg}</Text>
            )}
            {!loading && !errorMsg && location && (
                <LocationCard location={location} />
            )}
        </View>
    );
}
