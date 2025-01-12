import Row from "./Row.jsx";
import StyledErrorText from "./StyledErrorText.jsx";

const ErrorDisplay = ({
  error,
  padding = "1.5rem",
  alignment = "horizontal-center",
}) => {
  if (!error) return null;

  return (
    <Row type={alignment} padding={padding}>
      <StyledErrorText>
        {error?.message || error || "An unexpected error occurred."}
      </StyledErrorText>
    </Row>
  );
};

export default ErrorDisplay;
