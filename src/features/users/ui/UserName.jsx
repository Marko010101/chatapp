import { Link } from "react-router-dom";
import styled from "styled-components";

import { fixedSizeFullName } from "../../../utils/helpers.js";
import Heading from "../../../ui/Heading.jsx";

const StyledUserName = styled(Heading)`
  cursor: pointer;
  width: max-content;
  display: block;
`;

function UserName({
  firstName,
  lastName,
  length = 15,
  isUnderscore = false,
  heading = "h4",
  id,
}) {
  return (
    <Link to={`/profile/${id}`}>
      <StyledUserName as="h4">
        {fixedSizeFullName(firstName, lastName, length, isUnderscore)}
      </StyledUserName>
    </Link>
  );
}

export default UserName;
