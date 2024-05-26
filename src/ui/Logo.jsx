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
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }

  ${(props) =>
    props.isShrunk &&
    css`
      justify-items: start;
    `};

  & img {
    width: ${(props) => (props.isShrunk ? "4.2rem" : "11rem")};
    max-width: ${(props) => (props.isShrunk ? "4.2rem" : "11rem")};
    margin-left: ${(props) => (props.isShrunk ? "0" : "1rem")};
    transition: width 0.1s ease-in-out;
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
