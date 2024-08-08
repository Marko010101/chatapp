import styled from "styled-components";

import { useCurrentDummyUser } from "../features/users/hooks/useCurrentDummyUser.js";
import SpinnerFullPage from "../ui/loaders/SpinnerFullPage.jsx";
import Heading from "../ui/Heading.jsx";
import ButtonNeutral from "../ui/Buttons/ButtonNeutral.jsx";
import ErrorFallback from "../ui/ErrorFallback.jsx";
import { useMoveBack } from "../hooks/useMoveBack.js";
import Row from "../ui/Row.jsx";
import { useUserPosts } from "../features/posts/hooks/useUsersPosts.js";
import SearchedUserProfile from "./SearchedUserProfile.jsx";
import { useParams } from "react-router-dom";

const StyledProfile = styled.main`
  display: grid;
  grid-template-columns: 40rem max-content;
  align-items: start;
  border-bottom: var(--border);
`;

const UserImage = styled.div`
  width: 20rem;

  & img {
  }
`;

const UserDetail = styled.div`
  margin-top: 3rem;
`;

const RecreatedBtn = styled(ButtonNeutral)`
  margin-left: 3rem;
`;

const EmailLink = styled.a`
  font-weight: var(--font-weight-light);
  & span {
  }
`;

function Profile() {
  const moveBack = useMoveBack();
  const { userId } = useParams();
  const {
    currentUserById,
    isLoading,
    error: errorCurrentUser,
  } = useCurrentDummyUser();
  const isCurrentUser = currentUserById?.id === userId;

  const userPosts =
    currentUserById?.id === userId ? currentUserById?.id : userId;

  const {
    currentUserPosts,
    isLoading: isLoadingUserPost,
    error,
  } = useUserPosts(userPosts);

  if (isLoading || !currentUserById || isLoadingUserPost)
    return <SpinnerFullPage />;

  if (errorCurrentUser)
    return (
      <ErrorFallback
        error={errorCurrentUser || error}
        resetErrorBoundary={moveBack}
      />
    );

  if (!isCurrentUser) return <SearchedUserProfile />;

  const { firstName, lastName, email, registerDate, picture } = currentUserById;
  const userPostsAmount = currentUserPosts?.data.length;

  return (
    <StyledProfile>
      <UserImage>
        <img
          className="image-user"
          src={picture}
          alt={`${firstName} ${lastName}`}
        />
      </UserImage>

      <UserDetail>
        <Row type="horizontal">
          <Heading as="h3">
            {firstName}_{lastName}
          </Heading>
          <RecreatedBtn>Edit profile</RecreatedBtn>
        </Row>
        <Row type="horizontal" mt="5rem">
          <p>
            {userPostsAmount === 0 ? (
              <ButtonNeutral>Add Post</ButtonNeutral>
            ) : (
              userPostsAmount
            )}
          </p>
          <p>Registered: {new Date(registerDate).toLocaleDateString()}</p>
        </Row>
      </UserDetail>
    </StyledProfile>
  );
}

export default Profile;
