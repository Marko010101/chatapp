import styled, { css } from "styled-components";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { ToggleButton } from "./Buttons/ToggleButton.jsx";
import ErrorDisplay from "./ErrorDisplay.jsx";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 15rem 1fr;
  grid-template-rows: max-content 3rem;
  gap: 1.2rem;
  width: max-content;

  padding: 1rem 0;

  ${(props) =>
    props.type === "register" &&
    css`
      /* grid-template-columns: 15rem 30rem; */
    `}

  & span {
    position: relative;
    justify-self: center;
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
      {error && <ErrorDisplay error={error} padding="0rem" />}
    </StyledFormRow>
  );
}

export default FormRow;
