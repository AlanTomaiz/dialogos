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
import { MODAL_NAMESPACE } from '../../config/modals';
import { useDialEvents } from '../../hooks/useDialEvents';
import { useLoggedUserProfile } from '../../hooks/useLoggedUserProfile';
import { useModalManager } from '../../hooks/useModalManager';
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
  const { openModal, closeModal, isOpen } = useModalManager();

  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
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
    closeModal(MODAL_NAMESPACE.EVENT_DETAIL);
    openModal(MODAL_NAMESPACE.EVENT_SCANNER);
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
      closeModal(MODAL_NAMESPACE.EVENT_CREATE);
      setQrCodeEvent({ id: eventId, title: input.title.trim() });
      openModal(MODAL_NAMESPACE.EVENT_QR_CODE);
    } catch (error) {
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
              onPress={() => {
                setSelectedEvent(event);
                openModal(MODAL_NAMESPACE.EVENT_DETAIL);
              }}
            />
          ))}
        </View>
      </ScrollView>

      <EventCreateModal
        visible={isOpen(MODAL_NAMESPACE.EVENT_CREATE)}
        onClose={() => closeModal(MODAL_NAMESPACE.EVENT_CREATE)}
        onSubmit={handleCreateEvent}
      />

      <EventQRCodeModal
        visible={isOpen(MODAL_NAMESPACE.EVENT_QR_CODE)}
        eventId={qrCodeEvent?.id ?? ''}
        eventTitle={qrCodeEvent?.title ?? ''}
        onClose={() => {
          setQrCodeEvent(null);
          closeModal(MODAL_NAMESPACE.EVENT_QR_CODE);
        }}
      />

      <EventDetailModal
        event={selectedEvent}
        visible={isOpen(MODAL_NAMESPACE.EVENT_DETAIL)}
        onClose={() => {
          setSelectedEvent(null);
          closeModal(MODAL_NAMESPACE.EVENT_DETAIL);
        }}
        onConfirmPresence={handleConfirmPresence}
      />

      <QRCodeScannerScreen
        visible={isOpen(MODAL_NAMESPACE.EVENT_SCANNER)}
        onClose={() => closeModal(MODAL_NAMESPACE.EVENT_SCANNER)}
        onScanned={() => closeModal(MODAL_NAMESPACE.EVENT_SCANNER)}
      />

      <TouchableOpacity
        style={[styles.fab, { bottom: bottomOffset + Spacing.base }]}
        onPress={() => openModal(MODAL_NAMESPACE.EVENT_CREATE)}
      >
        <Plus size={26} color={Colors.WHITE} strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
}
