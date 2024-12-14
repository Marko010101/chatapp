export const navigatePostUrl = (id, postId) => {
  const { href } = window.location;
  if (href.includes("profile")) return `/profile/${id}/${postId}`;
  if (href.includes("explore/people")) return `${postId}`;
  return `/${postId}`;
};
