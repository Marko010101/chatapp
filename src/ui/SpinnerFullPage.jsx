/* import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn);
  }
`;

const StyledSpinner = styled.div`
  margin: 2.5rem;
  height: calc(100vh - 5rem);
`;

const SpinnerContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerFull = styled.div`
  margin: 4.8rem auto;

  width: 4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(farthest-side, var(--color-gray-400) 94%, #0000)
      top/0.2rem 0.2rem no-repeat,
    conic-gradient(#0000 30%, var(--color-gray-100));
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 0.7rem), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`;



function SpinnerFullPage() {
  return (
    <StyledSpinner>
      <SpinnerContainer>
        <SpinnerFull></SpinnerFull>
      </SpinnerContainer>
    </StyledSpinner>
  );
}

export default SpinnerFullPage;
 */
/* HTML: <div class="loader"></div> */

import React from "react";
import styled, { keyframes } from "styled-components";

const l13 = keyframes`
  100% {
    background-size: 100% 100%;
  }
`;

const StyledSpinner = styled.div`
  margin: 2.5rem;
  height: calc(100vh - 5rem);
`;

const SpinnerContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`;

const Loader = styled.div`
  width: 10rem;
  height: 2rem;
  mask: conic-gradient(
        from 135deg at top,
        transparent,
        black 0.5deg 90deg,
        transparent 90.5deg
      )
      0 0,
    conic-gradient(
        from -45deg at bottom,
        transparent,
        black 0.5deg 90deg,
        transparent 90.5deg
      )
      0 100%;
  mask-size: 25% 50%;
  mask-repeat: repeat-x;
  background: linear-gradient(var(--color-pink-logo) 0 0) left/0% 100% no-repeat
    var(--color-blue-logo);
  animation: ${l13} 2s infinite linear;
`;

function SpinnerFullPage() {
  return (
    <StyledSpinner>
      <SpinnerContainer>
        <Loader />
      </SpinnerContainer>
    </StyledSpinner>
  );
}

export default SpinnerFullPage;
