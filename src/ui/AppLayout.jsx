import styled from "styled-components";
import Sidebar from "./Sidebar.jsx";
import { Outlet } from "react-router-dom";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: var(--sidebar-width-medium) 1fr;
  background-color: var(--color-black);
`;
const Main = styled.div``;

function AppLayout() {
  return (
    <StyledContainer>
      <Sidebar />
      <Main>
        <Outlet />
      </Main>
    </StyledContainer>
  );
}

export default AppLayout;
