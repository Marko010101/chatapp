import toast from "react-hot-toast";

export const handleCopyUrl = (post) => {
  const { href } = window.location;
  let urlToCopy;

  if (href.includes(post.id)) {
    urlToCopy = href;
  } else {
    urlToCopy = href.includes("profile")
      ? `${href}/${post.id}`
      : `${href}${post.id}`;
  }

  navigator.clipboard
    .writeText(urlToCopy)
    .then(() => toast.success("URL copied to clipboard"))
    .catch((err) => console.error("Failed to copy URL: ", err));
};
