import styled from "styled-components";
import Sidebar from "./Sidebar.jsx";

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 24.45rem 1fr;
  height: 100vh;
  background-color: var(--color-black);
`;
const Main = styled.div``;

function AppLayout() {
  return (
    <StyledContainer>
      <Sidebar />
      <Main>{/* <Outlet /> */}</Main>
    </StyledContainer>
  );
}

export default AppLayout;
