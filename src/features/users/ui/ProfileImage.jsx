import styled from "styled-components";

const UserImage = styled.div`
  width: 15rem;

  & img {
    width: 100%;
  }
`;

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
