export const redirectUrlAfterPostDelete = () => {
  const path = window.location.pathname;

  if (path.includes("profile")) {
    const splitPath = path.split("/").slice(0, -1).join("/");
    return splitPath;
  }

  return "/";
};
