export function getPercentage(votes: number, totalVotes: number): number {
  if (totalVotes === 0) {
    return 0;
  }

  const percentage = (votes / totalVotes) * 100;
  return Math.round(percentage);
}
