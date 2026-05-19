import { File, Paths } from 'expo-file-system';
import { Platform, Share } from 'react-native';
import * as XLSX from 'xlsx';

export type Export = {
  Nome: string;
  RA: string | null;
  Email: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function autoFitColumns(data: any[]) {
  const columns = Object.keys(data[0] || {});

  return columns.map((column) => {
    const maxLength = Math.max(
      column.length,
      ...data.map((row) => String(row[column] ?? '').length)
    );

    return {
      wch: maxLength + 4
    };
  });
}

/**
 * Gera um arquivo XLSX a partir da lista de participantes.
 * @param participants Lista de participantes exportáveis
 * @returns Blob do arquivo XLSX
 */
export async function exportParticipantsToXLSX(participants: Export[]) {
  const worksheet = XLSX.utils.json_to_sheet(participants);
  worksheet['!cols'] = autoFitColumns(participants);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Participantes');

  const base64 = XLSX.write(workbook, {
    type: 'base64',
    bookType: 'xlsx'
  });

  // Caminho temporário
  const file = new File(Paths.cache, `relatorio_${Date.now()}.xlsx`);

  // Salva arquivo
  await file.write(base64, {
    encoding: 'base64'
  });

  // Compartilhamento
  if (Platform.OS === 'ios') {
    await Share.share({
      url: file.uri,
      title: 'Compartilhar relatório'
    });
  } else {
    await Share.share({
      message: file.uri,
      title: 'Compartilhar relatório'
    });
  }
}
