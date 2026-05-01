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

  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();
  const day = baseDate.getDate();

  const startMs = new Date(year, month, day, startH, startM, 0, 0).getTime();
  const endDate = new Date(year, month, day, endH, endM, 0, 0);

  if (endH * 60 + endM <= startH * 60 + startM) {
    endDate.setDate(endDate.getDate() + 1);
  }

  return { startMs, endMs: endDate.getTime() };
}

export function isWithinEventTimeWindow(
  timeRange: string,
  baseDateIso: string
): boolean {
  const window = parseEventTimeRange(timeRange, baseDateIso);
  if (!window) return true;

  const now = Date.now();
  return now >= window.startMs && now <= window.endMs;
}
