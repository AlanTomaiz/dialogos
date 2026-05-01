import { Timestamp } from 'firebase/firestore';
import type { EventData } from '../components/EventCard/EventCard';

export type DialEventDoc = {
  title?: string;
  timeRange?: string;
  duration?: string;
  location?: string;
  creatorUid?: string;
  creatorName?: string;
  creatorPhotoUrl?: string | null;
  description?: string;
  checked?: boolean;
  createdAt?: Timestamp | string | null;
};

function getCreatedAtIso(createdAt: DialEventDoc['createdAt']): string {
  if (!createdAt) {
    return new Date().toISOString();
  }

  if (typeof createdAt === 'string') {
    return createdAt;
  }

  return createdAt.toDate().toISOString();
}

export function mapDialEventToEventData(
  docId: string,
  data: DialEventDoc
): EventData {
  return {
    title: data.title?.trim() || 'Evento sem titulo',
    timeRange: data.timeRange?.trim() || 'Horario nao informado',
    duration: data.duration?.trim() || 'Duracao nao informada',
    location: data.location?.trim() || 'Local nao informado',
    creatorUid: data.creatorUid?.trim() || `unknown-${docId}`,
    creatorName: data.creatorName?.trim() || 'Usuario',
    creatorPhotoUrl: data.creatorPhotoUrl ?? null,
    description: data.description?.trim() || 'Sem descricao.',
    createdAt: getCreatedAtIso(data.createdAt),
    checked: data.checked ?? false
  };
}
