import { uploadFileToCloudinary } from "../../constants/Cloudinary.js";
import { useUpdatePost } from "./hooks/useUpdatePost.js";
import PostForm from "./ui/PostFrom.jsx";

const EditPost = ({ onClose, post }) => {
  const { mutate: updatePost, isLoading } = useUpdatePost();

  const handleEditPost = async (data) => {
    try {
      const imageUrl =
        data.image instanceof File
          ? await uploadFileToCloudinary(data.image)
          : data.image;

      const updatedPostData = { ...data, image: imageUrl };
      updatePost(
        { id: post.id, updatedPostData },
        {
          onSuccess: () => {
            onClose();
          },
          onError: (error) => {
            console.error("Error updating post:", error.message);
          },
        }
      );
    } catch (error) {
      console.error("Image upload failed:", error.message);
    }
  };

  return (
    <PostForm
      onClose={onClose}
      onSubmit={handleEditPost}
      initialValues={post}
      isLoading={isLoading}
    />
  );
};

export default EditPost;
