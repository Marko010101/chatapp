export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getFormattedDateInfo(dateString) {
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const yearsToReplace = [2019, 2020, 2021];
  const inputYear = inputDate.getFullYear();

  if (yearsToReplace.includes(inputYear)) {
    const inputMonth = inputDate.getMonth();
    const inputDay = inputDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    if (
      inputMonth < currentMonth ||
      (inputMonth === currentMonth && inputDay <= currentDay)
    ) {
      inputDate.setFullYear(currentYear);
    } else {
      inputDate.setFullYear(currentYear - 1);
    }
  }

  const diffInMilliseconds = currentDate - inputDate;
  const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  let relativeTime;
  if (diffInYears > 0) {
    relativeTime = `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
  } else if (diffInMonths > 0) {
    relativeTime = `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
  } else {
    relativeTime = `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  }

  // Format the date as 21 July 2024
  const formattedDate = inputDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return { relativeTime, formattedDate };
}

export function titleFix(str) {
  if (str.endsWith("...")) {
    return str.slice(0, -2);
  }
  return str;
}
