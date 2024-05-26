import styled, { css } from "styled-components";
import logoIcon from "../../public/Friendfolio.svg";
import logosvg from "../../public/logo.svg";
import { NavLink } from "react-router-dom";
import { useSidebarShrink } from "../context/SidebarShrinkingContext.jsx";

const StyledLogo = styled(NavLink).withConfig({
  shouldForwardProp: (prop) => prop !== "isShrunk",
})`
  /* width: 100%; */
  display: flex;
  align-self: center;
  justify-self: start;
  margin-left: 0.5rem;
  cursor: pointer;

  & :hover {
    scale: 105%;
  }

  ${(props) =>
    props.isShrunk &&
    css`
      align-items: center;
      justify-items: start;
    `};

  & img {
    max-width: 4.2rem;
    width: 4.2rem;

    ${(props) =>
      !props.isShrunk &&
      css`
        max-width: 11rem;
        transition: width 0.05s ease-in;
        margin-left: 1rem;
        width: 11rem;
      `};
  }
`;

function Logo() {
  const { isShrunk } = useSidebarShrink();

  return (
    <StyledLogo to="/" isShrunk={isShrunk}>
      <img src={isShrunk ? logosvg : logoIcon} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
