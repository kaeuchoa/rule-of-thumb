export function getTimeDiff(inputDate: Date): number {
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - inputDate.getTime();
  const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  return daysPassed;
}