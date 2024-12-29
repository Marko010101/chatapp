import styled from "styled-components";
import Sidebar from "./Sidebar.jsx";
import { Outlet, useLocation } from "react-router-dom";
import { useSidebarShrink } from "../context/SidebarShrinkingContext.jsx";
import Footer from "./Footer.jsx";

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
  const location = useLocation();
  const { isShrunk } = useSidebarShrink();
  const isHomePage = location.pathname === "/";
  const isMessagesPage = location.pathname.includes("messages");

  return (
    <StyledContainer isShrunk={isShrunk}>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
      {!isHomePage && !isMessagesPage && <Footer />}
    </StyledContainer>
  );
}

export default AppLayout;
