import styled from "styled-components";

import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";
import Footer from "../ui/Footer.jsx";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-black);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 3.3rem;

  & p {
    margin-top: 3rem;
    flex-grow: 1;

    & span {
      color: var(--color-brand-100);
      cursor: pointer;
      &:active {
        color: var(--color-grey-500);
      }
    }
  }

  & footer {
    align-self: center;
  }
`;

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Heading as="h1">Sorry, this page isn't available.</Heading>
      <p>
        The link you followed may be broken, or the page may have been removed.
        <span onClick={moveBack}> Go back to Instagram.</span>
      </p>
      <Footer />
    </StyledPageNotFound>
  );
}

export default PageNotFound;
