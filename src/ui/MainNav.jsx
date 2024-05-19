import styled from "styled-components";

const StyledNav = styled.ul`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
const NavItem = styled.li``;

function MainNav() {
  return (
    <StyledNav>
      <NavItem>Sidebar items</NavItem>
      <NavItem>Sidebar items</NavItem>
      <NavItem>Sidebar items</NavItem>
      <NavItem>Sidebar items</NavItem>
      <NavItem>Sidebar items</NavItem>
      <NavItem>Sidebar items</NavItem>
    </StyledNav>
  );
}

export default MainNav;
