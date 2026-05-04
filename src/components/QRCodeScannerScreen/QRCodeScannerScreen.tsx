import { CameraView, useCameraPermissions } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './style';

export type QRCodeScanResult = {
  success: boolean;
  message: string;
};

type QRCodeScannerScreenProps = {
  visible: boolean;
  onClose: () => void;
  onScanned: (value: string) => Promise<QRCodeScanResult> | QRCodeScanResult;
};

export function QRCodeScannerScreen({
  visible,
  onClose,
  onScanned
}: QRCodeScannerScreenProps) {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();
  const hasScanned = useRef(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [scanResult, setScanResult] = useState<QRCodeScanResult | null>(null);

  useEffect(() => {
    if (visible && !permission?.granted) {
      requestPermission();
    }
  }, [visible, permission?.granted, requestPermission]);

  useEffect(() => {
    if (!visible) {
      hasScanned.current = false;
      setScanResult(null);
    }

    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    };
  }, [visible]);

  function closeWithCleanup(): void {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    setScanResult(null);
    hasScanned.current = false;
    onClose();
  }

  async function handleScanned(value: string): Promise<void> {
    if (hasScanned.current) return;
    hasScanned.current = true;

    try {
      const result = await onScanned(value);
      setScanResult(result);

      if (result.success) {
        closeTimeoutRef.current = setTimeout(() => {
          closeWithCleanup();
        }, 900);
        return;
      }

      hasScanned.current = false;
    } catch {
      setScanResult({
        success: false,
        message: 'Falha ao processar leitura do QR Code.'
      });
      hasScanned.current = false;
    }
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={closeWithCleanup}
    >
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

        {scanResult ? (
          <View
            style={[
              styles.scanResultCard,
              scanResult.success
                ? styles.scanResultSuccess
                : styles.scanResultError
            ]}
          >
            <Text
              style={[
                styles.scanResultText,
                scanResult.success
                  ? styles.scanResultTextSuccess
                  : styles.scanResultTextError
              ]}
            >
              {scanResult.message}
            </Text>
          </View>
        ) : null}

        <View style={styles.scannerArea}>
          {permission?.granted ? (
            <CameraView
              style={styles.camera}
              barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
              onBarcodeScanned={({ data }) => {
                void handleScanned(data);
              }}
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

        <TouchableOpacity style={styles.closeButton} onPress={closeWithCleanup}>
          <Text style={styles.closeButtonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
