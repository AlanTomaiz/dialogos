import { Plus, UserCircle } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { EventData } from '../../components/EventCard/EventCard';
import { EventCard } from '../../components/EventCard/EventCard';
import { EventCreateModal } from '../../components/EventCreateModal/EventCreateModal';
import { validateEventCreateInput } from '../../components/EventCreateModal/EventCreateModal.action';
import type { EventCreateInput } from '../../components/EventCreateModal/EventCreateModal.type';
import { EventDetailModal } from '../../components/EventDetailModal/EventDetailModal';
import { EventParticipantsModal } from '../../components/EventParticipantsModal/EventParticipantsModal';
import { EventQRCodeModal } from '../../components/EventQRCodeModal/EventQRCodeModal';
import {
  QRCodeScannerScreen,
  type QRCodeScanResult
} from '../../components/QRCodeScannerScreen/QRCodeScannerScreen';
import { MODAL_NAMESPACE } from '../../config/modals';
import { useDialEvents } from '../../hooks/useDialEvents';
import { useEventAvailability } from '../../hooks/useEventAvailability';
import { useLoggedUserProfile } from '../../hooks/useLoggedUserProfile';
import { useModalManager } from '../../hooks/useModalManager';
import { useToast } from '../../hooks/useToast';
import { broadcastNewEventNotification } from '../../services/notificationService';
import { Colors, Spacing } from '../../theme';
import { formatEventDuration } from '../../utils/formatEventDuration';
import { verifyQRPayload } from '../../utils/qrCodeSigning';
import { styles } from './style';

type HomeProps = {
  onNavigateToProfile: () => void;
};

export function Home({ onNavigateToProfile }: HomeProps) {
  const insets = useSafeAreaInsets();
  const toast = useToast();
  const bottomOffset = insets.bottom;
  const { openModal, closeModal, isOpen } = useModalManager();

  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const [qrCodeEvent, setQrCodeEvent] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const [scannerEventId, setScannerEventId] = useState<string | null>(null);

  const [participantsEvent, setParticipantsEvent] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const {
    uid: loggedUserUid,
    fullName: loggedUserName,
    photoURL: loggedUserPhotoUrl,
    role: loggedUserRole
  } = useLoggedUserProfile();

  const isAdmin = loggedUserRole === 'ADMIN';

  const handleEventsLoadError = useCallback(() => {
    toast.show('Falha ao carregar eventos do Firebase.', 'error');
  }, [toast]);

  const {
    events,
    checkedEventIds,
    createEvent,
    registerEventParticipant,
    getParticipants
  } = useDialEvents(handleEventsLoadError);

  const isSelectedEventChecked =
    selectedEvent !== null && checkedEventIds.has(selectedEvent.id);

  const { isAvailable: isSelectedEventAvailable } =
    useEventAvailability(selectedEvent);

  const canPresentSelectedEventQRCode = Boolean(
    selectedEvent &&
    loggedUserUid &&
    isAdmin &&
    selectedEvent.creatorUid === loggedUserUid
  );

  function handleConfirmPresence(): void {
    if (!selectedEvent) return;

    setScannerEventId(selectedEvent.id);
    setSelectedEvent(null);
    closeModal(MODAL_NAMESPACE.EVENT_DETAIL);
    openModal(MODAL_NAMESPACE.EVENT_SCANNER);
  }

  function handleViewParticipants(): void {
    if (!selectedEvent) return;

    setParticipantsEvent({ id: selectedEvent.id, title: selectedEvent.title });
    setSelectedEvent(null);
    closeModal(MODAL_NAMESPACE.EVENT_DETAIL);
    openModal(MODAL_NAMESPACE.EVENT_PARTICIPANTS);
  }

  function handlePresentEventQRCode(): void {
    if (!selectedEvent) return;

    if (
      !loggedUserUid ||
      !isAdmin ||
      selectedEvent.creatorUid !== loggedUserUid
    ) {
      toast.show(
        'Somente administradores criadores do evento podem apresentar o QR Code.',
        'error'
      );
      return;
    }

    setQrCodeEvent({ id: selectedEvent.id, title: selectedEvent.title });
    closeModal(MODAL_NAMESPACE.EVENT_DETAIL);
    openModal(MODAL_NAMESPACE.EVENT_QR_CODE);
  }

  async function handleScanned(rawValue: string): Promise<QRCodeScanResult> {
    try {
      if (!scannerEventId) {
        const message = 'Evento para check-in nao encontrado.';
        toast.show(message, 'error');
        return { success: false, message };
      }

      const verification = await verifyQRPayload(rawValue);

      if (!verification.valid) {
        toast.show(verification.error, 'error');
        return { success: false, message: verification.error };
      }

      if (verification.eventId !== scannerEventId) {
        const message = 'QR Code pertence a outro evento.';
        toast.show(message, 'error');
        return { success: false, message };
      }

      const result = await registerEventParticipant(scannerEventId);

      if (!result.success) {
        toast.show(result.error, 'error');
        return { success: false, message: result.error };
      }

      const message = result.alreadyRegistered
        ? 'Presença já registrada.'
        : 'Presença confirmada!';

      if (result.alreadyRegistered) {
        toast.show(message, 'success');
      } else {
        toast.show(message, 'success');
      }

      setScannerEventId(null);

      return { success: true, message };
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Falha ao processar o QR Code para check-in.';

      toast.show(message, 'error');
      return { success: false, message };
    }
  }

  async function handleCreateEvent(input: EventCreateInput): Promise<void> {
    if (!isAdmin) {
      toast.show('Apenas administradores podem criar eventos.', 'error');
      return;
    }

    const validation = validateEventCreateInput(input);

    if (!validation.valid) {
      toast.show(validation.message, validation.severity);
      return;
    }

    if (!loggedUserUid) {
      toast.show('Usuario logado nao identificado.', 'error');
      return;
    }

    try {
      const eventId = await createEvent({
        title: input.title.trim(),
        timeRange: `${input.timeStart} - ${input.timeEnd}`,
        duration: formatEventDuration(input.timeStart, input.timeEnd),
        location: input.location.trim(),
        creatorUid: loggedUserUid,
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
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.headerTitle}>Encontros</Text>
        <TouchableOpacity
          style={styles.headerAction}
          onPress={onNavigateToProfile}
          accessibilityLabel="Abrir configuracoes"
          accessibilityRole="button"
        >
          <UserCircle size={28} color={Colors.TITLE} strokeWidth={1.5} />
        </TouchableOpacity>
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
              key={event.id}
              {...event}
              checked={checkedEventIds.has(event.id)}
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
        requesterUid={loggedUserUid}
        requesterRole={loggedUserRole}
        onLoadError={(message) => {
          toast.show(message, 'error');
          setQrCodeEvent(null);
          closeModal(MODAL_NAMESPACE.EVENT_QR_CODE);
        }}
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
        onPrimaryAction={
          canPresentSelectedEventQRCode
            ? handlePresentEventQRCode
            : handleConfirmPresence
        }
        primaryActionLabel={
          canPresentSelectedEventQRCode
            ? 'Apresentar QRCode'
            : 'Registrar presença'
        }
        showPrimaryAction={
          canPresentSelectedEventQRCode ||
          (!isSelectedEventChecked && isSelectedEventAvailable)
        }
        onViewParticipants={handleViewParticipants}
      />

      <QRCodeScannerScreen
        visible={isOpen(MODAL_NAMESPACE.EVENT_SCANNER)}
        onClose={() => {
          setScannerEventId(null);
          closeModal(MODAL_NAMESPACE.EVENT_SCANNER);
        }}
        onScanned={handleScanned}
      />

      <EventParticipantsModal
        visible={isOpen(MODAL_NAMESPACE.EVENT_PARTICIPANTS)}
        onClose={() => {
          setParticipantsEvent(null);
          closeModal(MODAL_NAMESPACE.EVENT_PARTICIPANTS);
        }}
        eventTitle={participantsEvent?.title ?? ''}
        fetchParticipants={() => getParticipants(participantsEvent?.id ?? '')}
      />

      {isAdmin && (
        <TouchableOpacity
          style={[styles.fab, { bottom: bottomOffset + Spacing.base }]}
          onPress={() => openModal(MODAL_NAMESPACE.EVENT_CREATE)}
        >
          <Plus size={26} color={Colors.WHITE} strokeWidth={2.5} />
        </TouchableOpacity>
      )}
    </View>
  );
}
