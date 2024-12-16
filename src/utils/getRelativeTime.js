export function getRelativeTime(diff) {
  if (diff.diffInSeconds < 60) return "Just now";
  if (diff.diffInMinutes < 60)
    return `${diff.diffInMinutes} minute${
      diff.diffInMinutes !== 1 ? "s" : ""
    } ago`;
  if (diff.diffInHours < 24)
    return `${diff.diffInHours} hour${diff.diffInHours !== 1 ? "s" : ""} ago`;
  if (diff.diffInDays < 30)
    return `${diff.diffInDays} day${diff.diffInDays !== 1 ? "s" : ""} ago`;
  if (diff.diffInMonths < 12)
    return `${diff.diffInMonths} month${
      diff.diffInMonths !== 1 ? "s" : ""
    } ago`;
  return `${diff.diffInYears} year${diff.diffInYears !== 1 ? "s" : ""} ago`;
}
