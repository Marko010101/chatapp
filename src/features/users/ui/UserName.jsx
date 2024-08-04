import styled from "styled-components";
import { fixedSizeFullName } from "../../../utils/helpers.js";
import Heading from "../../../ui/Heading.jsx";

const StyledUserName = styled(Heading)`
  cursor: pointer;
`;

function UserName({
  firstName,
  lastName,
  length = 15,
  isUnderscore = false,
  heading = "h4",
}) {
  return (
    <StyledUserName as={heading}>
      {fixedSizeFullName(firstName, lastName, length, isUnderscore)}
    </StyledUserName>
  );
}

export default UserName;
