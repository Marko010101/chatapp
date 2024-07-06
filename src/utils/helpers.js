export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getFormattedDateInfo(dateString) {
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const yearsToReplace = [2019, 2020, 2021];
  const inputYear = inputDate.getFullYear();

  // Replace the year based on the logic provided
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
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInMonths / 12);

  let relativeTime;

  // Add the "Just now" and other relative time checks
  if (diffInSeconds < 60) {
    relativeTime = "Just now";
  } else if (diffInMinutes < 60) {
    relativeTime = `${diffInMinutes} minute${
      diffInMinutes !== 1 ? "s" : ""
    } ago`;
  } else if (diffInHours < 24) {
    relativeTime = `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`;
  } else if (diffInDays < 30) {
    relativeTime = `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`;
  } else if (diffInMonths < 12) {
    relativeTime = `${diffInMonths} month${diffInMonths !== 1 ? "s" : ""} ago`;
  } else {
    relativeTime = `${diffInYears} year${diffInYears !== 1 ? "s" : ""} ago`;
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
