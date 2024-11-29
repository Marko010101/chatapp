import styled from "styled-components";

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(3px);
  z-index: 600;
  transition: all 0.5s;
`;

export default StyledOverlay;
