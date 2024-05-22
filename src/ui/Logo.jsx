import styled from "styled-components";
import logoIcon from "../../public/Friendfolio.svg";
import { NavLink } from "react-router-dom";

const StyledLogo = styled(NavLink)`
  align-self: center;
  justify-self: start;
  margin-left: 1rem;
  cursor: pointer;

  & img {
    width: 10rem;
  }
`;

function Logo() {
  return (
    <StyledLogo to="/">
      <img src={logoIcon} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
