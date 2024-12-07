export const redirectUrlAfterPostDelete = () => {
  const path = window.location.pathname;

  if (path.includes("profile")) {
    const splitPath = path.split("/").slice(0, -1).join("/");
    console.log("splitPath", splitPath);
    return splitPath;
  }

  return "/";
};
