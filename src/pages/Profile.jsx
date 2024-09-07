import styled from "styled-components";
import { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useCurrentDummyUser } from "../features/users/hooks/useCurrentDummyUser.js";
import SpinnerFullPage from "../ui/loaders/SpinnerFullPage.jsx";
import ErrorFallback from "../ui/ErrorFallback.jsx";
import { useMoveBack } from "../hooks/useMoveBack.js";
import { useUserPosts } from "../features/posts/hooks/useUsersPosts.js";
import ProfileImage from "../features/users/ui/ProfileImage.jsx";
import { useUserById } from "../features/users/hooks/useUserById.js";
import UserDetails from "../features/users/ui/UserDetails.jsx";
import ProfilePosts from "../features/posts/ui/ProfilePosts.jsx";
import Modal, { ModalContext } from "../ui/Modal.jsx";
import ModalPost from "../features/posts/ModalPost.jsx";

const StyledProfile = styled.main`
  display: grid;
  grid-template-columns: 30rem 45rem;
  align-items: start;
  border-bottom: var(--border);
  padding: 2rem 0;
`;

function Profile() {
  const moveBack = useMoveBack();
  let { postId } = useParams();
  const { open } = useContext(ModalContext);
  const { userId } = useParams();
  const {
    currentUser,
    isLoading,
    error: errorCurrentUser,
  } = useCurrentDummyUser();

  const user = currentUser?.id === userId ? currentUser?.id : userId;
  const isCurrentUser = currentUser?.id === userId;

  const {
    currentUserPosts: currentSearchedUserPost,
    isLoading: isLoadingUserPost,
    error,
  } = useUserPosts(user);

  const {
    userById,
    isLoading: isLoading1,
    error: error1,
  } = useUserById(userId);

  useEffect(() => {
    if (postId) {
      open("ProfilePost");
    }
  }, [postId, open]);

  if (isLoading || isLoading1 || !currentUser || isLoadingUserPost)
    return <SpinnerFullPage />;

  if (errorCurrentUser)
    return (
      <ErrorFallback
        error={errorCurrentUser || error}
        resetErrorBoundary={moveBack}
      />
    );

  const {
    firstName,
    lastName,
    registerDate,
    picture = "/public/default-user.jpg",
    dateOfBirth,
    gender,
    title,
  } = isCurrentUser ? currentUser : userById;
  const postLength = currentSearchedUserPost?.data.length;

  return (
    <>
      <StyledProfile>
        <ProfileImage
          firstName={firstName}
          lastName={lastName}
          picture={picture}
        />

        <UserDetails
          firstName={firstName}
          lastName={lastName}
          postLength={postLength}
          registerDate={registerDate}
          isCurrentUser={isCurrentUser}
          dateOfBirth={dateOfBirth}
          gender={gender}
          title={title}
        />
      </StyledProfile>
      <ProfilePosts
        posts={currentSearchedUserPost}
        isCurrentUser={isCurrentUser}
      />
      <Modal.Window name="ProfilePost">
        <ModalPost />
      </Modal.Window>
    </>
  );
}

export default Profile;
