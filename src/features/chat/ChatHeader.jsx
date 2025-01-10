import styled from "styled-components";

import Row from "../../ui/Row.jsx";
import defaultImage from "../../assets/default-user.jpg";
import { fixedSizeFullName } from "../../utils/fixedSizeFullName.js";
import { Link } from "react-router-dom";
const ChatHeader = ({ user }) => {
  const { firstName, lastName, id } = user;
  const picture = user?.picture || defaultImage;
  return (
    <StyledChatHeader>
      <Row type="horizontal">
        <Link to={`/profile/${id}`}>
          <img src={picture} alt={`${firstName} picture`} />
        </Link>
        <Link to={`/profile/${id}`}>
          <p>{fixedSizeFullName(firstName, lastName, 50)}</p>
        </Link>
      </Row>
    </StyledChatHeader>
  );
};

export default ChatHeader;

const StyledChatHeader = styled(Row)`
  position: fixed;
  background-color: inherit;
  border-bottom: var(--border);
  z-index: 100;
  left: calc(var(--sidebar-width-shrunk) + var(--sidebar-width-messages));
  background-color: var(--color-black);
  width: calc(
    100% - (var(--sidebar-width-shrunk) + var(--sidebar-width-messages))
  );
  padding: 1.5rem 3rem;

  & > div {
    justify-content: start;
    align-items: center;
    gap: 3rem;

    & img {
      width: 6.5rem;
      height: 6.5rem;
      border-radius: 50%;
    }
    & p {
      font-size: var(--font-size-big);
    }
  }
`;
