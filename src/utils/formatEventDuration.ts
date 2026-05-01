export function formatEventDuration(timeStart: string, timeEnd: string): string {
  const [startH = 0, startM = 0] = timeStart.split(':').map(Number);
  const [endH = 0, endM = 0] = timeEnd.split(':').map(Number);
  const totalMinutes = endH * 60 + endM - (startH * 60 + startM);

  if (totalMinutes <= 0) {
    return 'Duracao invalida';
  }

  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}min`;
}
