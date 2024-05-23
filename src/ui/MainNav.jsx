import { NavLink } from "react-router-dom";
import NavLinkItem from "./NavLinkItem.jsx";
import styled, { css } from "styled-components";

import messageIcon from "../../public/messages.svg";
import activeMessageIcon from "../../public/messagesActive.svg";

import { IoHomeOutline, IoSearchSharp, IoHomeSharp } from "react-icons/io5";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { PiFilmReelFill, PiFilmReelLight } from "react-icons/pi";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiAddCircleLine, RiAddCircleFill } from "react-icons/ri";

// import { useSidebarShrink } from "../context/SidebarShrinkingContext.jsx";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  /* ${(props) =>
    props.isShrunk &&
    css`
      & span {
        display: none;
      }
    `}; */
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 1.4rem;

    color: var(--color-gray-300);
    font-size: 1.6rem;
    font-weight: var(--font-weight-regular);
    padding: 1rem 1.2rem;
    transition: all 0.3s;
  }

  & span {
    align-self: self-end;
  }

  /* This works because react-router places the active class on the active NavLink */

  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-gray-100);
    border-radius: var(--border-radius-lg);
    font-weight: var(--font-weight-bold);
  }

  &:hover {
    background-color: var(--backdrop-color);
    border-radius: var(--border-radius-lg);
  }

  & svg,
  img {
    width: 2.8rem;
    height: 2.8rem;
    color: var(--color-gray-50);
    transition: all 0.2s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg,
  &:hover img,
  &:active img,
  &.active:link img,
  &.active:visited img {
    color: var(--color-gray-50);
    scale: 110%;
  }
`;

function MainNav() {
  // const { isShrunk } = useSidebarShrink();

  // css properties does not working same for all the svgs so i had to create NavLinkItem.
  return (
    <nav>
      <ul>
        <NavList>
          <li>
            <StyledNavLink to="/">
              <NavLinkItem
                icon={<IoHomeOutline />}
                iconActive={<IoHomeSharp />}
                title={""}
              />
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/search">
              <NavLinkItem
                icon={<IoIosSearch />}
                iconActive={<IoSearchSharp />}
                title={"search"}
              />
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/explore">
              <NavLinkItem
                icon={<MdOutlineExplore />}
                iconActive={<MdExplore />}
                title={"explore"}
              />
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/reels">
              <NavLinkItem
                icon={<PiFilmReelLight />}
                iconActive={<PiFilmReelFill />}
                title={"reels"}
              />
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/messages">
              <NavLinkItem
                icon={<img src={messageIcon} alt="message icon" />}
                iconActive={
                  <img src={activeMessageIcon} alt="Active messages image" />
                }
                title={"messages"}
              />
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="notifications">
              <NavLinkItem
                icon={<IoMdHeartEmpty />}
                iconActive={<IoMdHeart />}
                title={"notifications"}
              />
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="create">
              <NavLinkItem
                icon={<RiAddCircleLine />}
                iconActive={<RiAddCircleFill />}
                title={"create"}
              />
            </StyledNavLink>
          </li>
          <li>
            <StyledNavLink to="/profile">
              <CgProfile />
              <span>Profile</span>
            </StyledNavLink>
          </li>
        </NavList>
      </ul>
    </nav>
  );
}

export default MainNav;
