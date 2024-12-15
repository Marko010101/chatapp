export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getFormattedDateInfo(dateString) {
  const inputDate = new Date(dateString);
  const currentDate = new Date();

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

  // Format the date
  const formattedDate = inputDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return { relativeTime, formattedDate, diffInMonths };
}

export function titleFix(str) {
  if (str.endsWith("...")) {
    return str.slice(0, -3);
  } else if (str.length === 0) {
    return "";
  } else if (!str.endsWith(".")) {
    return str + ".";
  }
  return str;
}

export function fixedSizeFullName(
  firstName,
  lastName,
  length = 40,
  useUnderscore = false
) {
  const fullName = useUnderscore
    ? `${firstName}_${lastName}`
    : `${firstName} ${lastName}`;

  if (fullName.length > length) {
    return fullName.slice(0, length) + "...";
  }

  return fullName;
}

export function calculateAge(dateOfBirth) {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // Adjust age if the birthday hasn't occurred yet this year
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
