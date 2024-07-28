import styled from "styled-components";
import { fixedSizeFullName } from "../../../utils/helpers.js";

const StyledUserName = styled.h5`
  cursor: pointer;
`;

function UserName({
  firstName,
  lastName,
  length = 15,
  useUnderscore = false,
  handleMouseEnter,
  handleMouseLeave,
}) {
  return (
    <StyledUserName
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {fixedSizeFullName(firstName, lastName, length, useUnderscore)}
    </StyledUserName>
  );
}

export default UserName;
