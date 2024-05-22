import styled, { css } from "styled-components";
import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";
import { useSidebarShrink } from "../context/SidebarShrinkingContext.jsx";

import logoIcon from "../../public/Friendfolio.svg";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: var(--sidebar-width-medium) 1fr;
  grid-template-rows: max-content;
  background-color: var(--color-black);
  transition: 0.4s ease;

  ${(props) =>
    props.isShrunk &&
    css`
      grid-template-columns: var(--sidebar-width-shrunk) 1fr;
    `}
`;

const Main = styled.div``;

function AppLayout() {
  const { isShrunk } = useSidebarShrink();

  return (
    <StyledContainer isShrunk={isShrunk}>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledContainer>
  );
}

export default AppLayout;
