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
  display: flex;
  align-items: center;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }

  ${(props) =>
    props.isShrunk &&
    css`
      justify-items: start;
    `};

  .logo-icon,
  .logo-svg {
    width: 4.2rem;
  }

  ${(props) =>
    !props.isShrunk &&
    css`
      .logo-svg {
        display: none;
      }
      .logo-icon {
        width: 11rem;
        margin-left: 0.7rem;
      }
      .logo-icon:active {
        filter: brightness(60%);
      }
    `}

  ${(props) =>
    props.isShrunk &&
    css`
      .logo-icon {
        display: none;
      }
      .logo-svg {
        display: block;
      }
    `}
`;

function Logo() {
  const { isShrunk } = useSidebarShrink();

  return (
    <StyledLogo to="/" isShrunk={isShrunk}>
      <img className="logo-svg" src={logosvg} alt="Logo" />
      <img className="logo-icon" src={logoIcon} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
