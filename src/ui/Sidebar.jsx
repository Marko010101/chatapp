import styled, { css } from "styled-components";
import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";
import { useSidebarShrink } from "../context/SidebarShrinkingContext.jsx";

const StyledSidebar = styled.aside`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) =>
    props.isShrunk
      ? "var(--sidebar-width-shrunk)"
      : "var(--sidebar-width-medium)"};
  z-index: 100;
  border-right: var(--border-sidebar);
  height: 100vh;
  display: grid;
  grid-template-rows: 10rem 1fr;
  padding: 0 1rem;
  overflow: hidden;

  transition: width 0.1s ease;

  /* Different transition duration when transitioning to shrunk state */
  ${(props) =>
    props.isShrunk &&
    css`
      transition-duration: 0.05s;
    `}
`;

function Sidebar() {
  const { isShrunk, setIsShrunk } = useSidebarShrink();

  const handleMouseEnter = () => {
    setIsShrunk(false);
  };

  const handleMouseLeave = () => {
    setIsShrunk(true);
  };

  return (
    <StyledSidebar
      isShrunk={isShrunk}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
