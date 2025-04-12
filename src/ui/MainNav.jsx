import { NavLink } from "react-router-dom";
import NavLinkItem from "./NavLinkItem.jsx";
import styled, { css } from "styled-components";
import { useState } from "react";

import messageIcon from "../../public/messages.svg";
import activeMessageIcon from "../../public/messagesActive.svg";

import { IoHomeOutline, IoSearchSharp, IoHomeSharp } from "react-icons/io5";
import { MdOutlineExplore, MdExplore } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { PiFilmReelFill, PiFilmReelLight } from "react-icons/pi";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiAddCircleLine, RiAddCircleFill } from "react-icons/ri";
import { useSidebarShrink } from "../context/SidebarShrinkingContext.jsx";
import { BiLogOut } from "react-icons/bi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { MdPeopleAlt } from "react-icons/md";

import { useLogout } from "../features/users/hooks/useLogout.js";
import { useCurrentDummyUser } from "../features/users/hooks/useCurrentDummyUser.js";
import useWindowWidth from "../hooks/useWindowWidth.js";
import CreatePost from "../features/posts/CreatePost.jsx";
import Row from "./Row.jsx";

function MainNav() {
  const { isShrunk } = useSidebarShrink();
  const { logout } = useLogout();
  const { currentUser, isLoading: currentUserIsLoading } = useCurrentDummyUser();
  const { windowWidth } = useWindowWidth();
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const handleCreatePostToggle = () => {
    setIsCreatePostOpen((isOpen) => !isOpen);
  };

  return (
    <StyledNav as="nav" type="vertical" padding="0 0 2rem 0">
      {isCreatePostOpen && <CreatePost onClose={handleCreatePostToggle} />}
      <div>
        <NavList as="ul" type="vertical" gap="0.4rem" isShrunk={isShrunk}>
          <li>
            <StyledNavLink to="/">
              <NavLinkItem icon={<IoHomeOutline />} iconActive={<IoHomeSharp />} title="Home" />
            </StyledNavLink>
          </li>
          {/* <li>
            <StyledNavLink to="/search">
              <NavLinkItem icon={<IoIosSearch />} iconActive={<IoSearchSharp />} title="search" />
            </StyledNavLink>
          </li> */}
          {/* <li>
            <StyledNavLink to="/explore">
              <NavLinkItem icon={<MdOutlineExplore />} iconActive={<MdExplore />} title="explore" />
            </StyledNavLink>
          </li> */}
          {/* <li>
            <StyledNavLink to="/reels">
              <NavLinkItem icon={<PiFilmReelLight />} iconActive={<PiFilmReelFill />} title="reels" />
            </StyledNavLink>
          </li> */}
          <li>
            <StyledNavLink to="/messages">
              <NavLinkItem
                icon={<img src={messageIcon} alt="message icon" />}
                iconActive={<img src={activeMessageIcon} alt="Active messages image" />}
                title="messages"
              />
            </StyledNavLink>
          </li>
          {/* <li>
            <StyledNavLink to="/notifications">
              <NavLinkItem icon={<IoMdHeartEmpty />} iconActive={<IoMdHeart />} title="notifications" />
            </StyledNavLink>
          </li> */}
          <li>
            <StyledNavButton
              type="horizontal-center"
              gap="1.4rem"
              padding="1rem 1.2rem"
              onClick={handleCreatePostToggle}
            >
              {isCreatePostOpen ? <RiAddCircleFill /> : <RiAddCircleLine />}
              <span>Create</span>
            </StyledNavButton>
          </li>
          {windowWidth <= 992 && (
            <li>
              <StyledNavLink to="/explore/people">
                <NavLinkItem icon={<MdOutlinePeopleAlt />} iconActive={<MdPeopleAlt />} title="explore/people" />
              </StyledNavLink>
            </li>
          )}
        </NavList>
      </div>
      <div>
        <NavList isShrunk={isShrunk}>
          {currentUser?.id ? (
            <li>
              <StyledNavLink to={`/profile/${currentUser?.id}`}>
                <CgProfile />
                <span>Profile</span>
              </StyledNavLink>
            </li>
          ) : (
            <li>
              <StyledNavLink>
                <CgProfile />
                <span>Profile</span>
              </StyledNavLink>
            </li>
          )}
          <li>
            <StyledNavLink onClick={logout} to="/">
              <BiLogOut style={{ marginLeft: "-0.3rem" }} />
              <span>Logout</span>
            </StyledNavLink>
          </li>
        </NavList>
      </div>
    </StyledNav>
  );
}

export default MainNav;

const StyledNav = styled(Row)`
  list-style: none;
  justify-content: space-between;
`;

const NavList = styled(Row)`
  ${(props) =>
    props.isShrunk &&
    css`
      & span {
        display: none;
      }
    `};
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
const StyledNavButton = styled(Row)`
  justify-content: start;

  color: var(--color-gray-300);
  font-size: 1.6rem;
  font-weight: var(--font-weight-regular);
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: var(--backdrop-color);
    border-radius: var(--border-radius-lg);
  }

  & svg {
    width: 2.8rem;
    height: 2.8rem;
    color: var(--color-gray-50);
    transition: all 0.2s;
  }

  &:hover svg {
    scale: 110%;
  }
`;
