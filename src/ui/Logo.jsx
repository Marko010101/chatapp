import styled, { css } from "styled-components";
import logoIcon from "../../public/Friendfolio.svg";
import logosvg from "../../public/logo.svg";
import { NavLink } from "react-router-dom";
import { useSidebarShrink } from "../context/SidebarShrinkingContext.jsx";

const StyledLogo = styled(NavLink).withConfig({
  shouldForwardProp: (prop) => prop !== "isShrunk",
})`
  align-self: center;
  margin-left: 0.5rem;
  cursor: pointer;

  & :hover {
    scale: 103%;
  }

  ${(props) =>
    props.isShrunk &&
    css`
      align-items: center;
      justify-items: start;
    `};

  & img {
    width: 4.2rem;

    ${(props) =>
      !props.isShrunk &&
      css`
        transition: width 0.1s ease-in;
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
