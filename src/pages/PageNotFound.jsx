import styled from "styled-components";

import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";
import Footer from "../ui/Footer.jsx";
import Row from "../ui/Row.jsx";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound as="main" type="vertical" padding="3.3rem">
      <Heading as="h1">Sorry, this page isn't available.</Heading>
      <p>
        The link you followed may be broken, or the page may have been removed.
        <span onClick={moveBack}>
          {" "}
          Go back to <span>PetFolio.</span>
        </span>
      </p>
      <Footer />
    </StyledPageNotFound>
  );
}

export default PageNotFound;

const StyledPageNotFound = styled(Row)`
  height: 100vh;
  background-color: var(--color-black);
  align-items: center;
  justify-content: start;

  & p {
    margin-top: 3rem;
    flex-grow: 1;

    & span {
      color: var(--color-brand-100);
      cursor: pointer;

      & span {
        font-weight: var(--font-weight-semibold);
      }

      &:active {
        color: var(--color-gray-500);
      }
    }
  }

  & footer {
    align-self: center;
  }
`;
