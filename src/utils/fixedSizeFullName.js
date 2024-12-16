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
