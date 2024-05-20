import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from "react-icons/hi2";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-100);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <ul>
        <NavList>
          <li>
            <StyledNavLink to="/">
              <HiOutlineHome /> <span>Home</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/search">
              <HiOutlineHome /> <span>Search</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/Explore">
              <HiOutlineCalendarDays />
              <span>Explore</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/Reels">
              <HiOutlineHomeModern />
              <span>Reels</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/Inbox">
              <HiOutlineUsers />
              <span>Messages</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/notifications">
              <HiOutlineCog6Tooth />
              <span>Notifications</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="Create">
              <HiOutlineCog6Tooth />
              <span>Create</span>
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/profile">
              <HiOutlineCog6Tooth />
              <span>Profile</span>
            </StyledNavLink>
          </li>
        </NavList>
      </ul>
    </nav>
  );
}

export default MainNav;
