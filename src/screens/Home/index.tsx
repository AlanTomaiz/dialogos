import { Plus } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { EventData } from '../../components/EventCard/EventCard';
import { EventCard } from '../../components/EventCard/EventCard';
import { EventCreateModal } from '../../components/EventCreateModal/EventCreateModal';
import { validateEventCreateInput } from '../../components/EventCreateModal/EventCreateModal.action';
import type { EventCreateInput } from '../../components/EventCreateModal/EventCreateModal.type';
import { EventDetailModal } from '../../components/EventDetailModal/EventDetailModal';
import { EventQRCodeModal } from '../../components/EventQRCodeModal/EventQRCodeModal';
import { QRCodeScannerScreen } from '../../components/QRCodeScannerScreen/QRCodeScannerScreen';
import { useDialEvents } from '../../hooks/useDialEvents';
import { useLoggedUserProfile } from '../../hooks/useLoggedUserProfile';
import { useToast } from '../../hooks/useToast';
import { auth } from '../../libs/firebase';
import { broadcastNewEventNotification } from '../../services/notificationService';
import { Colors, Spacing } from '../../theme';
import { formatEventDuration } from '../../utils/formatEventDuration';
import { styles } from './style';

export function Home() {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const bottomOffset = insets.bottom;

  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isScannerVisible, setIsScannerVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [qrCodeEvent, setQrCodeEvent] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const {
    uid: loggedUserUid,
    fullName: loggedUserName,
    photoURL: loggedUserPhotoUrl
  } = useLoggedUserProfile();

  const handleEventsLoadError = useCallback(() => {
    toast.show('Falha ao carregar eventos do Firebase.', 'error');
  }, [toast]);

  const { events, createEvent } = useDialEvents(handleEventsLoadError);

  function handleConfirmPresence(): void {
    setSelectedEvent(null);
    setIsScannerVisible(true);
  }

  async function handleCreateEvent(input: EventCreateInput): Promise<void> {
    const validation = validateEventCreateInput(input);

    if (!validation.valid) {
      toast.show(validation.message, validation.severity);
      return;
    }

    const creatorUid = loggedUserUid || auth.currentUser?.uid || '';

    if (!creatorUid) {
      toast.show('Usuario logado nao identificado.', 'error');
      return;
    }

    try {
      const eventId = await createEvent({
        title: input.title.trim(),
        timeRange: `${input.timeStart} - ${input.timeEnd}`,
        duration: formatEventDuration(input.timeStart, input.timeEnd),
        location: input.location.trim(),
        creatorUid,
        creatorName: loggedUserName.trim(),
        creatorPhotoUrl: loggedUserPhotoUrl,
        description: input.description.trim()
      });

      toast.show('Evento criado com sucesso.', 'success');
      broadcastNewEventNotification(input.title.trim()).catch(() => {});
      setIsCreateModalVisible(false);
      setQrCodeEvent({ id: eventId, title: input.title.trim() });
    } catch (error) {
      console.log('[handleCreateEvent]', error);
      const message =
        error instanceof Error
          ? error.message
          : 'Falha ao criar evento no Firebase.';

      toast.show(message, 'error');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Encontros</Text>
      </View>

      {/* <View style={styles.metricRowWrapper}>
        <View style={styles.metricRow}>
          <MetricCard
            labelIcon="A"
            label="Avisos"
            status="3 não lidos"
            progress={0.35}
            backgroundColor={Colors.SECONDARY}
          />
          <MetricCard
            labelIcon="T"
            label="Tarefas"
            status="2 pendentes"
            isComplete
            progress={0.7}
            backgroundColor={Colors.PRIMARY}
          />
        </View>
      </View> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: bottomOffset + Spacing.xl + 72
        }}
      >
        <View style={styles.agendaList}>
          {events.map((event) => (
            <EventCard
              key={`${event.title}-${event.createdAt}`}
              {...event}
              onPress={() => setSelectedEvent(event)}
            />
          ))}
        </View>
      </ScrollView>

      <EventCreateModal
        visible={isCreateModalVisible}
        onClose={() => setIsCreateModalVisible(false)}
        onSubmit={handleCreateEvent}
      />

      <EventQRCodeModal
        visible={qrCodeEvent !== null}
        eventId={qrCodeEvent?.id ?? ''}
        eventTitle={qrCodeEvent?.title ?? ''}
        onClose={() => setQrCodeEvent(null)}
      />

      <EventDetailModal
        event={selectedEvent}
        visible={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        onConfirmPresence={handleConfirmPresence}
      />

      <QRCodeScannerScreen
        visible={isScannerVisible}
        onClose={() => setIsScannerVisible(false)}
        onScanned={() => setIsScannerVisible(false)}
      />

      <TouchableOpacity
        style={[styles.fab, { bottom: bottomOffset + Spacing.base }]}
        onPress={() => setIsCreateModalVisible(true)}
      >
        <Plus size={26} color={Colors.WHITE} strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
}
