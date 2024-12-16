import { Link } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";

import { ModalContext } from "../../../ui/modal/Modal.jsx";
import Heading from "../../../ui/Heading.jsx";
import { useEffect } from "react";
import { fixedSizeFullName } from "../../../utils/fixedSizeFullName.js";

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
  id,
}) {
  const { close } = useContext(ModalContext);

  useEffect(
    function () {
      if (!id) close();
    },
    [id]
  );

  return (
    <Link to={`/profile/${id}`}>
      <StyledUserName as="h4">
        {fixedSizeFullName(firstName, lastName, length, isUnderscore)}
      </StyledUserName>
    </Link>
  );
}

export default UserName;
