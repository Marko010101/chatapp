import styled from "styled-components";

const StyledOwnerImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  min-width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: transparent;
  background: linear-gradient(var(--color-pink-logo), var(--color-blue-logo));

  img {
    width: 3.6rem;
    border: 0.2rem solid var(--color-black);
  }
`;

function OwnerImage({ ownerPicture }) {
  return (
    <StyledOwnerImage>
      <img
        className="image-user"
        src={ownerPicture || "../../../public/default-user.jpg"}
        alt="Owner image"
      />
    </StyledOwnerImage>
  );
}

export default OwnerImage;
