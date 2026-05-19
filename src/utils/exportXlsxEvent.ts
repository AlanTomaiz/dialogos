import * as XLSX from 'xlsx';

export type ExportParticipant = {
  name: string;
  ra: string | null;
  email: string | null;
};

/**
 * Gera um arquivo XLSX a partir da lista de participantes.
 * @param participants Lista de participantes exportáveis
 * @returns Blob do arquivo XLSX
 */
export function exportParticipantsToXLSX(
  participants: ExportParticipant[]
): Blob {
  const wsData = [
    ['Nome', 'RA', 'E-mail'],
    ...participants.map((p) => [p.name, p.ra ?? '', p.email ?? ''])
  ];

  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, ws, 'Participantes');

  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  return new Blob([wbout], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  });
}
