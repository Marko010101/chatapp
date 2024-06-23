import styled from "styled-components";

import { useCurrentDummyUser } from "../features/users/useCurrentDummyUser.js";
import SpinnerFullPage from "../ui/SpinnerFullPage.jsx";
import Heading from "../ui/Heading.jsx";
import ButtonNeutral from "../ui/Buttons/ButtonNeutral.jsx";

const StyledProfile = styled.main`
  display: grid;
  grid-template-columns: 40rem 1fr;
  grid-template-rows: 40rem 1fr;
  align-items: start;
`;

const UserImage = styled.div`
  width: 20rem;

  & img {
  }
`;

const UserDetail = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 3rem;

  & h3 {
    align-items: center;
    justify-items: center;
  }
`;

function Profile() {
  const { currentUserById, isLoading, isError } = useCurrentDummyUser();

  if (isLoading || !currentUserById) {
    return <SpinnerFullPage />;
  }

  // Error state: Handle error if fetching user data fails
  if (isError) {
    return <div>Error loading profile. Please try again later.</div>;
  }
  const { firstName, lastName, email, registerDate } = currentUserById;

  return (
    <StyledProfile>
      <UserImage>
        <img
          className="image-user"
          src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg"
        />
      </UserImage>

      <UserDetail>
        <Heading as="h3">
          {firstName}_{lastName}
        </Heading>
        <ButtonNeutral>Edit profile</ButtonNeutral>
      </UserDetail>
      <p>Email: {email}</p>
      <p>Registered Date: {new Date(registerDate).toLocaleDateString()}</p>
    </StyledProfile>
  );
}
export default Profile;
