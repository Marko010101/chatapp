import styled from "styled-components";
import SpinnerMini from "../../../ui/loaders/SpinnerMini.jsx";

function ProfileImage({ firstName, lastName, picture, isLoading = false }) {
  return (
    <UserImage>
      <img
        className="image-user"
        src={picture}
        alt={`${firstName} ${lastName}`}
      />
      {isLoading && <SpinnerMini />}
    </UserImage>
  );
}

export default ProfileImage;

const UserImage = styled.div`
  align-self: center;
  justify-self: center;
  width: 15rem;

  & img {
    width: 100%;
  }
`;
