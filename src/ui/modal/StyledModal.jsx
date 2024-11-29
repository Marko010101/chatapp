import styled, { keyframes } from "styled-components";

const slideDown = keyframes`
  0% {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

const StyledOverlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  transition: all 0.5s;
  background-color: var(--color-black);
  animation: ${slideDown} 0.2s ease-out;
`;

export default StyledOverlay;
