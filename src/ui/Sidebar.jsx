import styled, { css } from "styled-components";

import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";
import { useSidebarShrink } from "../context/SidebarShrinkingContext.jsx";
import useWindowWidth from "../hooks/useWindowWidth.js";
import { useEffect } from "react";

function Sidebar() {
  const { isShrunk, setIsShrunk } = useSidebarShrink();
  const { windowWidth } = useWindowWidth();
  const isSmallDevice = windowWidth <= 1200;

  const handleMouseEnter = () => {
    if (isSmallDevice) return;
    setIsShrunk(false);
  };

  const handleMouseLeave = () => {
    if (isSmallDevice) return;
    setIsShrunk(true);
  };

  useEffect(
    function () {
      if (isSmallDevice) {
        setIsShrunk(true);
      }
    },
    [isSmallDevice]
  );

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

const StyledSidebar = styled.aside`
  position: fixed;
  left: 0;
  width: ${(props) =>
    props.isShrunk
      ? "var(--sidebar-width-shrunk)"
      : "var(--sidebar-width-medium)"};
  z-index: 100;
  border-right: var(--border);
  height: 100vh;
  display: grid;
  grid-template-rows: 10rem 1fr;
  padding: 0 1rem;
  overflow: hidden;
  background-color: var(--color-black);

  transition: width 0.1s ease;

  ${(props) =>
    props.isShrunk &&
    css`
      transition-duration: 0.05s;
    `}
`;
