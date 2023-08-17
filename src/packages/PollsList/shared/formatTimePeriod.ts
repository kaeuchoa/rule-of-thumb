export function formatTimePeriod(days: number): string {
  if (days < 1) {
    return '0 days';
  }

  if (days < 30) {
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  }

  if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months} ${months === 1 ? 'month' : 'months'}`;
  }

  const years = Math.floor(days / 365);
  return `${years} ${years === 1 ? 'year' : 'years'}`;
}
