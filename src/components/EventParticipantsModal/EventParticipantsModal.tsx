import { Users } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLoggedUserProfile } from '../../hooks/useLoggedUserProfile';
import { useToast } from '../../hooks/useToast';
import type { ParticipantData } from '../../services/eventService';
import { Colors } from '../../theme';
import { exportParticipantsToXLSX } from '../../utils/exportXlsxEvent';
import { getInitialsFromName } from '../../utils/getInitialsFromName';
import { styles } from './style';

type EventParticipantsModalProps = {
  visible: boolean;
  onClose: () => void;
  eventTitle: string;
  fetchParticipants: () => Promise<ParticipantData[]>;
};

export function EventParticipantsModal({
  visible,
  onClose,
  eventTitle,
  fetchParticipants
}: EventParticipantsModalProps) {
  const insets = useSafeAreaInsets();
  const { role } = useLoggedUserProfile();
  const toast = useToast();

  const [participants, setParticipants] = useState<ParticipantData[]>([]);
  const [loading, setLoading] = useState(false);

  // Exportação para Google Drive
  async function handleExportToGoogleDrive() {
    try {
      const exportList = participants.map((p) => ({
        Nome: p.fullName ?? 'Usuário sem nome',
        RA: p.ra ?? 'Sem RA',
        Email: p.email ?? 'Sem e-mail'
      }));

      await exportParticipantsToXLSX(exportList);

      toast.show(
        'Arquivo exportado para o Google Drive com sucesso!',
        'success'
      );
    } catch (error) {
      toast.show(
        'Erro ao exportar para o Google Drive. Tente novamente.',
        'error'
      );
    }
  }

  useEffect(() => {
    if (!visible) return;

    setLoading(true);
    fetchParticipants()
      .then(setParticipants)
      .catch(() => setParticipants([]))
      .finally(() => setLoading(false));
  }, [visible, fetchParticipants]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.handle} />

          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Presenças</Text>
              <Text style={styles.headerSubtitle} numberOfLines={1}>
                {eventTitle}
              </Text>
            </View>
            {role === 'ADMIN' && participants.length > 0 && (
              <TouchableOpacity onPress={handleExportToGoogleDrive}>
                <Text style={{ color: Colors.PRIMARY, fontWeight: 'bold' }}>
                  Exportar XLSX
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {loading ? (
            <ActivityIndicator color={Colors.TITLE} style={styles.loader} />
          ) : participants.length === 0 ? (
            <View style={styles.emptyState}>
              <Users size={32} color={Colors.MUTED} strokeWidth={1.5} />
              <Text style={styles.emptyText}>Nenhuma presença registrada</Text>
            </View>
          ) : (
            <FlatList
              data={participants}
              keyExtractor={(item) => item.uid}
              contentContainerStyle={styles.listContent}
              renderItem={({ item }) => {
                const name = item.fullName ?? 'Usuário';
                const initials = getInitialsFromName(name);

                return (
                  <View style={styles.participantRow}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>{initials}</Text>
                    </View>
                    <View style={styles.participantInfo}>
                      <Text style={styles.participantName}>{name}</Text>
                      {item.ra ? (
                        <Text style={styles.participantTime}>{item.ra}</Text>
                      ) : null}
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}
