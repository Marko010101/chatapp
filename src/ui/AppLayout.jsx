import styled from "styled-components";
import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";
import { useSidebarShrink } from "../context/SidebarShrinkingContext.jsx";

const StyledContainer = styled.div`
  position: inherit;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
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
