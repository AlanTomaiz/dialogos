import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './style';

type QRCodeScannerScreenProps = {
  visible: boolean;
  onClose: () => void;
  onScanned: (value: string) => void;
};

export function QRCodeScannerScreen({
  visible,
  onClose,
  onScanned
}: QRCodeScannerScreenProps) {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const hasScanned = useRef(false);

  useEffect(() => {
    if (visible && !permission?.granted) {
      requestPermission();
    }
  }, [visible, permission?.granted, requestPermission]);

  useEffect(() => {
    if (!visible) {
      hasScanned.current = false;
    }
  }, [visible]);

  function handleScanned(value: string): void {
    if (hasScanned.current) return;
    hasScanned.current = true;
    onScanned(value);
    onClose();
  }

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View
        style={[
          styles.container,
          { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 16 }
        ]}
      >
        <View style={styles.headerCard}>
          <Text style={styles.headerTitle}>Scan QR Code</Text>
          <Text style={styles.headerSubtitle}>
            Aponte a camera para o QR Code do evento.
          </Text>
        </View>

        <View style={styles.scannerArea}>
          {permission?.granted ? (
            <CameraView
              style={styles.camera}
              barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
              onBarcodeScanned={({ data }) => handleScanned(data)}
            />
          ) : (
            <View style={styles.permissionFallback}>
              <Text style={styles.permissionText}>
                Permita o uso da camera para continuar.
              </Text>
              <TouchableOpacity
                style={styles.permissionButton}
                onPress={() => requestPermission()}
              >
                <Text style={styles.permissionButtonText}>Permitir camera</Text>
              </TouchableOpacity>
            </View>
          )}

          <View pointerEvents="none" style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        </View>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
