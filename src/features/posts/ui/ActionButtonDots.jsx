import { PiDotsThreeBold } from "react-icons/pi";
import styled from "styled-components";

const StyledActionDots = styled.span`
  width: 2.5rem;
  height: 2.5rem;

  & > svg {
    width: 100%;
    height: 100%;
  }
`;

function ActionButtonDots() {
  return (
    <StyledActionDots>
      <PiDotsThreeBold />
    </StyledActionDots>
  );
}

export default ActionButtonDots;
