const TIME_RANGE_PATTERN = /^(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})$/;

type EventTimeWindow = {
  startMs: number;
  endMs: number;
};

function parseEventTimeRange(
  timeRange: string,
  baseDateIso: string
): EventTimeWindow | null {
  const match = timeRange.match(TIME_RANGE_PATTERN);
  if (!match) return null;

  const baseDate = new Date(baseDateIso);
  if (Number.isNaN(baseDate.getTime())) return null;

  const [, startTime, endTime] = match;
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  if (endH * 60 + endM <= startH * 60 + startM) {
    return null;
  }

  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const day = baseDate.getDate();

  const startMs = new Date(year, month, day, startH, startM, 0, 0).getTime();
  const endMs = new Date(year, month, day, endH, endM, 0, 0).getTime();

  return { startMs, endMs };
}

export function isWithinEventTimeWindow(
  timeRange: string,
  baseDateIso: string
): boolean {
  return isWithinEventTimeWindowAt(timeRange, baseDateIso, Date.now());
}

export function isWithinEventTimeWindowAt(
  timeRange: string,
  baseDateIso: string,
  nowMs: number
): boolean {
  const window = parseEventTimeRange(timeRange, baseDateIso);
  if (!window) return false;

  return nowMs >= window.startMs && nowMs <= window.endMs;
}
