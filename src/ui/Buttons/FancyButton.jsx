import styled, { keyframes } from "styled-components";

// Define CSS variables
const cssVariables = {
  textColor: "hsla(210, 50%, 85%, 1)",
  shadowColor: "hsla(210, 40%, 52%, .4)",
  btnColor: "hsl(210, 80%, 42%)",
  bgColor: "#141218",
};

// Keyframes for bubbles animation
const bubbles = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-66.666%);
  }
`;

const StyledButton = styled.button`
  position: relative;
  padding: 0.5rem 1rem;
  border: none;
  margin-right: -1rem;
  margin-left: 1rem;
  background: none;
  cursor: pointer;
  font-family: "Source Code Pro", monospace;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 1.5rem;
  color: ${cssVariables.textColor};
  background-color: ${cssVariables.btnColor};
  box-shadow: ${cssVariables.shadowColor} 0.1rem 0.1rem 1.1rem;
  border-radius: 0.4rem;
  z-index: 0;
  overflow: hidden;

  &:focus {
    outline-color: transparent;
    box-shadow: ${cssVariables.btnColor} 0.1rem 0.1rem 1.1rem;
  }

  &:hover .right::after {
    transform: translate(0, -47%) rotate(0deg);
  }

  .right:hover::after {
    transform: translate(0, -50%) rotate(-7deg);
  }

  .left:hover ~ .right::after {
    transform: translate(0, -50%) rotate(7deg);
  }

  &::before {
    content: "";
    pointer-events: none;
    opacity: 0.6;
    background: radial-gradient(
        circle at 20% 35%,
        transparent 0,
        transparent 0.1rem,
        ${cssVariables.textColor} 0.15rem,
        ${cssVariables.textColor} 0.2rem,
        transparent 0.2rem
      ),
      radial-gradient(
        circle at 75% 44%,
        transparent 0,
        transparent 0.1rem,
        ${cssVariables.textColor} 0.15rem,
        ${cssVariables.textColor} 0.2rem,
        transparent 0.2rem
      ),
      radial-gradient(
        circle at 46% 52%,
        transparent 0,
        transparent 0.2rem,
        ${cssVariables.textColor} 0.25rem,
        ${cssVariables.textColor} 0.3rem,
        transparent 0.3rem
      );
    width: 100%;
    height: 15rem;
    top: 0;
    left: 0;
    position: absolute;
    animation: ${bubbles} 5s linear infinite both;
  }

  &::after {
    content: var(--content);
    display: block;
    position: absolute;
    white-space: nowrap;
    padding: 2rem 2rem;
    pointer-events: none;
    font-weight: 200;
    top: -1.5rem;
    left: -1rem;
  }
`;

const SideDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
`;

const RightDiv = styled(SideDiv)`
  left: 66%;

  &::after {
    content: var(--content);
    display: block;
    position: absolute;
    white-space: nowrap;
    padding: 2rem 2rem;
    pointer-events: none;
    top: -1.5rem;
    left: calc(-66% - 1rem);
    background-color: ${cssVariables.bgColor};
    color: transparent;
    transition: transform 0.4s ease-out;
    transform: translate(0, -90%) rotate(0deg);
  }
`;

const LeftDiv = styled(SideDiv)`
  right: 66%;
`;

const FancyButton = ({ children, onClick, disabled, ref, ...props }) => {
  return (
    <StyledButton
      style={{
        "--content": `"${children}"`,
      }}
      onClick={onClick}
      ref={ref}
      {...props}
      disabled={disabled}
    >
      <LeftDiv className="left" />
      {children}
      <RightDiv className="right" />
    </StyledButton>
  );
};

export default FancyButton;
