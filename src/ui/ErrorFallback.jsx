import styled from "styled-components";
import Heading from "./Heading.jsx";
import GlobalStyles from "../styles/globalStyles.js";
import StyledButton from "./Buttons/StyledButton.jsx";
import Row from "./Row.jsx";

const StyledErrorFallback = styled(Row)`
  height: 100vh;
  background-color: var(--color-grey-50);
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback as="main" type="horizontal-center" padding="4.8rem">
        <Box>
          <Heading as="h1">Something went wrong 🙄</Heading>
          <p>{error}</p>
          <StyledButton size="large" onClick={resetErrorBoundary}>
            Try again
          </StyledButton>
        </Box>
      </StyledErrorFallback>
    </>
  );
}

export default ErrorFallback;
