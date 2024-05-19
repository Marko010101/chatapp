import styled from "styled-components";
import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";

function Sidebar() {
  const StyledSidebar = styled.aside`
    border-right: var(--border-sidebar);
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-left: 3rem;
    padding-top: 4rem;
  `;

  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
