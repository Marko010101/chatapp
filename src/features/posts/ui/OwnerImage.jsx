import styled, { css } from "styled-components";
const StyledOwnerImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  min-width: 4rem;
  height: 4rem;
  border-radius: 50%;
  ${(props) =>
    props.haveBorder &&
    css`
      background-color: transparent;
      background: linear-gradient(
        var(--color-pink-logo),
        var(--color-blue-logo)
      );
      img {
        width: 3.6rem;
        border: 0.2rem solid var(--color-black);
      }
    `}
`;

function OwnerImage({ ownerPicture, haveBorder = false }) {
  return (
    <StyledOwnerImage haveBorder={haveBorder}>
      <img
        className="image-user"
        src={ownerPicture || "../../../public/default-user.jpg"}
        alt="Owner image"
      />
    </StyledOwnerImage>
  );
}

export default OwnerImage;
