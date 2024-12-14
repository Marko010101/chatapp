import styled from "styled-components";

const HoverableRow = ({
  handleMouseEnter,
  handleMouseLeave,
  isHovered,
  children,
  hoverContent,
}) => {
  return (
    <StyledDiv onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {isHovered && hoverContent}
    </StyledDiv>
  );
};

export default HoverableRow;

const StyledDiv = styled.div`
  position: relative;
`;
