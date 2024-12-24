import styled, { keyframes } from "styled-components";

const MessagesSidebar = () => {
  return <StyledMessagesSidebar>MessagesSidebar</StyledMessagesSidebar>;
};

export default MessagesSidebar;

const slideIn = keyframes`
    from {
      left: -50%; 
    }
    to {
      left: var(--sidebar-width-shrunk); 
    }
  `;

const StyledMessagesSidebar = styled.div`
  position: fixed;
  width: var(--sidebar-width-messages);
  top: 0;
  left: var(--sidebar-width-shrunk);
  padding: 1rem;
  border-right: var(--border);
  height: 100vh;
  max-height: 100vh;
  animation: ${slideIn} 0.2s ease;
`;
