import styled from "styled-components";
import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";

function Sidebar() {
  const StyledSidebar = styled.aside`
    border-right: var(--border-sidebar);
    height: 100vh;
    display: grid;
    grid-template-rows: 10rem 1fr;
    padding: 0 1rem;
    overflow: hidden;
  `;

  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
