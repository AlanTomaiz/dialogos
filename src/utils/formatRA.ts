export function formatRA(ra: string): string {
  if (ra.includes('-')) {
    return ra;
  }

  if (ra.length < 2) {
    return ra;
  }

  return `${ra.slice(0, -1)}-${ra.slice(-1)}`;
}
