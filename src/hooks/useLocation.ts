import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export type LocationCoords = {
    latitude: number;
    longitude: number;
    accuracy: number | null;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
};

type UseLocationResult = {
    location: LocationCoords | null;
    errorMsg: string | null;
    loading: boolean;
};

export function useLocation(): UseLocationResult {
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

    return { location, errorMsg, loading };
}
