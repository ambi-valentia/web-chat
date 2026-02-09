export const getRandomBoolean = () => Math.random() > 0.5;

export const getRandomNumber = (min, max) => {
  if (max === undefined) {
    max = min;
    min = 0;
  }

  return Math.floor(Math.random() * (max + 1 - min) + min);
};

export const getRandomTimestamp = (start, end) => {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const twoMonthsAgo = now - 2 * 31 * day;
  const oneWeekAgo = now - 7 * day;

  const from = start ?? (Math.random() < 0.65 ? oneWeekAgo : twoMonthsAgo);
  const to = end ?? now;

  return getRandomNumber(from, to);
};

export const getRandomTimestampsAsc = (start, end, amount) => {
  const timestamps = [];

  timestamps.push(start);

  let current = start;
  for (let i = 0; i < amount - 1; i++) {
    const gap = getRandomNumber(1, 90) * 60 * 1000;

    current = Math.min(current + gap, end);
    timestamps.push(current);
  }

  return timestamps;
};

export const getRecentTimestamp = () =>
  Date.now() - getRandomNumber(5 * 60 * 60 * 1000, 120000);
