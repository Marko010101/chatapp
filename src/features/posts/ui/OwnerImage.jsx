import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import defaultUserImg from "../../../assets/default-user.jpg";

function OwnerImage({ ownerPicture, haveBorder = false, id }) {
  return (
    <Link to={`/profile/${id}`}>
      <StyledOwnerImage haveBorder={haveBorder}>
        <img
          className="image-user"
          src={ownerPicture || defaultUserImg}
          alt="Owner image"
        />
      </StyledOwnerImage>
    </Link>
  );
}

export default OwnerImage;

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
