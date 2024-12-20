import styled from "styled-components";
import useHover from "../../../../hooks/useHover.js";
import Row from "../../../../ui/Row.jsx";
import UserProfileOnHover from "../../UserProfileOnHover.jsx";
import UserName from "../UserName.jsx";
import HoverableRow from "./HoverableRow.jsx";

const HoveredName = ({ user, text, left }) => {
  const {
    isHovered: isHeaderHovered,
    handleMouseEnter: handleHeaderMouseEnter,
    handleMouseLeave: handleHeaderMouseLeave,
  } = useHover();

  const { id, firstName, lastName } = user;

  return (
    <>
      <StyledRow type="horizontal-center">
        <HoverableRow
          handleMouseEnter={handleHeaderMouseEnter}
          handleMouseLeave={handleHeaderMouseLeave}
          isHovered={isHeaderHovered}
          hoverContent={<UserProfileOnHover user={user} left={left} />}
        >
          <UserName
            firstName={firstName}
            lastName={lastName}
            length={40}
            id={id}
          />
        </HoverableRow>
        <span>{text}</span>
      </StyledRow>
    </>
  );
};

export default HoveredName;

const StyledRow = styled(Row)`
  align-self: self-start;
`;
