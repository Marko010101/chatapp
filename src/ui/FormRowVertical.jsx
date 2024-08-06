import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToggleButton } from "./Buttons/ToggleButton.jsx";

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.p`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const Span = styled.span`
  position: relative;

  & input {
    width: 100%;
  }

  & span {
    right: 1.5rem;
  }
`;

function FormRowVertical({
  label,
  error,
  children,
  isPassword,
  onClick,
  isPasswordVisible,
}) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      <Span>
        {children}
        {isPassword && (
          <ToggleButton onClick={onClick}>
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </ToggleButton>
        )}
      </Span>
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRowVertical;
