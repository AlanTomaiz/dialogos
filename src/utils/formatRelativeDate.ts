export function formatRelativeDate(createdAt: string): string {
  const createdTime = new Date(createdAt).getTime();

  if (Number.isNaN(createdTime)) {
    return createdAt;
  }

  const diffInSeconds = Math.max(
    0,
    Math.floor((Date.now() - createdTime) / 1000)
  );

  if (diffInSeconds <= 60) {
    return 'Agora mesmo';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `Há ${diffInMinutes}min`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `Há ${diffInHours}hr`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 7) {
    return `Há ${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'}`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInWeeks < 4) {
    return `Há ${diffInWeeks} ${diffInWeeks === 1 ? 'semana' : 'semanas'}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths < 12) {
    return `Há ${diffInMonths} ${diffInMonths === 1 ? 'mês' : 'meses'}`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `Há ${diffInYears} ${diffInYears === 1 ? 'ano' : 'anos'}`;
}
