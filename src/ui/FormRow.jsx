import styled, { css } from "styled-components";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import ErrorText from "./ErrorText.jsx";

const ToggleButton = styled.span`
  position: absolute;
  right: 2.3rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 15rem 25rem;
  grid-template-rows: max-content 3rem;
  gap: 1.2rem;
  width: 40rem;
  max-width: 40rem;

  padding: 1rem 0;

  ${(props) =>
    props.type === "register" &&
    css`
      grid-template-columns: 15rem 30rem;
    `}

  & span {
    position: relative;
  }

  & p {
    grid-column: 2/3;
  }

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: var(--border);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  /*   @media (max-width: 768px) {
    grid-template-columns: 90%;
    justify-content: center;
    font-size: 1.5rem;
    padding: 2.1rem 0;
    gap: 2.2rem;
  }
  @media (max-width: 576px) {
    grid-template-columns: 80%;
    justify-content: center;
    gap: 1.5rem;
  }
  @media (max-width: 320px) {
    gap: 1.1rem;
    padding: 1.5rem 0;
  }   */
`;

const Label = styled.label`
  font-weight: var(--font-weight-medium);
  justify-self: flex-start;
`;

function FormRow({
  label,
  error,
  children,
  isPassword = false,
  isPasswordVisible,
  onClick,
}) {
  return (
    <StyledFormRow isPassword={isPassword}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      <span>
        {children}
        {isPassword && (
          <ToggleButton onClick={onClick}>
            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
          </ToggleButton>
        )}
      </span>
      {error && <ErrorText>{error}</ErrorText>}
    </StyledFormRow>
  );
}

export default FormRow;
