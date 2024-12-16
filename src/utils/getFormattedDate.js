export function getFormattedDate(dateString) {
  const inputDate = new Date(dateString);
  return inputDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
