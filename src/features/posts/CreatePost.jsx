import { useCurrentDummyUser } from "../users/hooks/useCurrentDummyUser.js";
import { uploadFileToCloudinary } from "../../constants/Cloudinary.js";
import { useCreatePost } from "./hooks/useCreatePost.js";
import PostForm from "./ui/PostFrom.jsx";

const CreatePost = ({ onClose }) => {
  const { currentUser } = useCurrentDummyUser();
  const { createUserPost, isLoading } = useCreatePost(currentUser?.id);

  const handleCreatePost = async (data) => {
    const imageUrl = await uploadFileToCloudinary(data.image);
    const postPayload = {
      ...data,
      image: imageUrl,
      likes: 0,
      owner: currentUser.id,
    };
    await createUserPost(postPayload);
    onClose();
  };

  return (
    <PostForm
      onClose={onClose}
      onSubmit={handleCreatePost}
      isLoading={isLoading}
    />
  );
};

export default CreatePost;
