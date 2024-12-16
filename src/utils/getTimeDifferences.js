export function getTimeDifferences(dateString) {
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  const diffInMilliseconds = currentDate - inputDate;

  return {
    diffInSeconds: Math.floor(diffInMilliseconds / 1000),
    diffInMinutes: Math.floor(diffInMilliseconds / (1000 * 60)),
    diffInHours: Math.floor(diffInMilliseconds / (1000 * 60 * 60)),
    diffInDays: Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24)),
    diffInMonths: Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 30)),
    diffInYears: Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365)),
  };
}
