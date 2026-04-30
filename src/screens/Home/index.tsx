import { Plus } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { EventData } from '../../components/EventCard/EventCard';
import { EventCard } from '../../components/EventCard/EventCard';
import { EventDetailModal } from '../../components/EventDetailModal/EventDetailModal';
import { MetricCard } from '../../components/MetricCard/MetricCard';
import { QRCodeScannerScreen } from '../../components/QRCodeScannerScreen/QRCodeScannerScreen';
import { Spacing } from '../../theme';
import { styles } from './style';

const EVENTS: EventData[] = [
  {
    title: 'Café da Manhã',
    timeRange: '08:30 – 09:00',
    duration: '30 min',
    accentColor: '#F5952A',
    location: 'Sala de Convivência',
    creatorName: 'Ana Souza',
    creatorInitials: 'AS',
    createdAt: 'Criado há 2 dias',
    description: 'Momento de integração da equipe antes do expediente. Café, pão de queijo e boas conversas.',
  },
  {
    title: 'Reunião de Equipe',
    timeRange: '10:00 – 11:00',
    duration: '1 hora',
    accentColor: '#4A7FE5',
    location: 'Sala de Reuniões 3',
    creatorName: 'Bruno Lima',
    creatorInitials: 'BL',
    createdAt: 'Criado ontem',
    description: 'Alinhamento semanal de metas, bloqueios e próximos passos do projeto.',
  },
  {
    title: 'Almoço',
    timeRange: '12:00 – 13:00',
    duration: '1 hora',
    accentColor: '#22C55E',
    location: 'Restaurante do Térreo',
    creatorName: 'Carla Mendes',
    creatorInitials: 'CM',
    createdAt: 'Criado hoje',
    description: 'Almoço em grupo para fortalecer os laços entre os membros da equipe.',
  },
];

export function Home() {
  const insets = useSafeAreaInsets();
  const bottomOffset = insets.bottom;
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isScannerVisible, setIsScannerVisible] = useState(false);

  function handleConfirmPresence(): void {
    setSelectedEvent(null);
    setIsScannerVisible(true);
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hoje</Text>
      </View>

      <View style={styles.metricRowWrapper}>
        <View style={styles.metricRow}>
          <MetricCard
            labelIcon="A"
            label="Avisos"
            status="3 não lidos"
            progress={0.35}
            backgroundColor="#4A7FE5"
          />
          <MetricCard
            labelIcon="T"
            label="Tarefas"
            status="2 pendentes"
            isComplete
            progress={0.7}
            backgroundColor="#F5952A"
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottomOffset + Spacing.xl + 72 }}
      >
        <View style={styles.agendaList}>
          {EVENTS.map((event) => (
            <EventCard
              key={event.title}
              {...event}
              onPress={() => setSelectedEvent(event)}
            />
          ))}
        </View>
      </ScrollView>

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

      <TouchableOpacity style={[styles.fab, { bottom: bottomOffset + Spacing.base }]}>
        <Plus size={26} color="#fff" strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
}
