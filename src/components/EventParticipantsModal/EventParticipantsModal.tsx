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
import type { ParticipantData } from '../../services/eventService';
import { Colors } from '../../theme';
import {
  ExportParticipant,
  exportParticipantsToXLSX
} from '../../utils/exportXlsxEvent';
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
  const [participants, setParticipants] = useState<ParticipantData[]>([]);
  const [loading, setLoading] = useState(false);

  // Exportação XLSX
  function handleExport() {
    const exportList: ExportParticipant[] = participants.map((p) => ({
      name: p.fullName ?? '',
      ra: p.ra ?? '',
      email: '' // Email não está presente em ParticipantData, ajustar se necessário
    }));

    const blob = exportParticipantsToXLSX(exportList);

    // Download para web
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `participantes_${eventTitle.replace(/\s+/g, '_')}.xlsx`;
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
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
            <Text style={styles.headerTitle}>Presenças</Text>
            <Text style={styles.headerSubtitle} numberOfLines={1}>
              {eventTitle}
            </Text>
            {role === 'ADMIN' && participants.length > 0 && (
              <TouchableOpacity
                style={{ marginLeft: 12 }}
                onPress={handleExport}
              >
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
