import styled from "styled-components";

function ProfileImage({ firstName, lastName, picture }) {
  return (
    <UserImage>
      <img
        className="image-user"
        src={picture}
        alt={`${firstName} ${lastName}`}
      />
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
