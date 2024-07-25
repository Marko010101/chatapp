import styled from "styled-components";
import DummyUsersList from "../features/users/DummyUsersList.jsx";
const StyledSugestions = styled.div`
  padding: 5rem 0rem;

  h4 {
    font-weight: var(--font-weight-semibold);
  }
`;

function AllPeople() {
  return (
    <StyledSugestions>
      <h4>Suggested</h4>
      <DummyUsersList suggestedPage={true} />
    </StyledSugestions>
  );
}

export default AllPeople;
