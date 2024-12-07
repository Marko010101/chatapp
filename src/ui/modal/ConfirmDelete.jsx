import React from "react";
import StyledOverlay from "./StyledOverlay.jsx";
import StyledModal from "./StyledModal.jsx";
import StyledButton from "../Buttons/StyledButton.jsx";
import styled from "styled-components";
import Row from "../Row.jsx";
import { useOutsideClick } from "../../hooks/useOutsideClick.js";

const ConfirmDelete = ({ contextText, onConfirm, onClose, isLoading }) => {
  const ref = useOutsideClick(onClose);

  return (
    <StyledConfirmOverlay>
      <StyledConfirmModal ref={ref}>
        <p>Are you sure you want to delete this {contextText}?</p>
        <Row type="horizontal-center" gap="2rem" margin="2rem 0rem 1rem 0">
          <StyledButtonDelete onClick={onConfirm} disabled={isLoading}>
            Yes, Delete
          </StyledButtonDelete>
          <StyledButton onClick={onClose} disabled={isLoading}>
            Cancel
          </StyledButton>
        </Row>
      </StyledConfirmModal>
    </StyledConfirmOverlay>
  );
};

export default ConfirmDelete;

const StyledConfirmOverlay = styled(StyledOverlay)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const StyledConfirmModal = styled(StyledModal)`
  width: max-content;
  text-align: center;
  padding: 2rem 1.5rem;
`;

const StyledButtonDelete = styled(StyledButton)`
  color: var(--color-red-400);
  &:hover,
  :active {
    color: var(--color-red-600);
  }
`;
