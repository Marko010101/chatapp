import styled from "styled-components";
import { useUserById } from "../features/users/hooks/useUserById.js";
import ButtonNeutral from "../ui/Buttons/ButtonNeutral.jsx";
import Row from "../ui/Row.jsx";
import Heading from "../ui/Heading.jsx";
import ProfileImage from "../features/users/ui/ProfileImage.jsx";
import { StyledProfile } from "../features/users/ui/StyledProfile.jsx";

const UserDetail = styled.div`
  margin-top: 3rem;
`;

const RecreatedBtn = styled(ButtonNeutral)`
  margin-left: 3rem;
`;

function SearchedUserProfile({ user, posts }) {
  const { userById, isLoading, error } = useUserById(user);
  console.log(posts);
  console.log(userById);
  const userPostsAmount = posts?.data.length;

  if (isLoading) return;

  const { firstName, lastName, email, registerDate, picture } = userById;

  return (
    <StyledProfile>
      <ProfileImage
        firstName={firstName}
        lastName={lastName}
        picture={picture}
      />

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

export default SearchedUserProfile;
