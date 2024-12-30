import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { useUserById } from "../users/hooks/useUserById.js";
import Row from "../../ui/Row.jsx";
import SpinnerMini from "../../ui/loaders/SpinnerMini.jsx";
import DefaultUser from "../../assets/default-user.jpg";
import { fixedSizeFullName } from "../../utils/fixedSizeFullName.js";
import ErrorDisplay from "../../ui/ErrorDisplay.jsx";

const ConversationUser = ({ receiverId }) => {
  const { userById, isLoading, error } = useUserById(receiverId);

  if (isLoading)
    return (
      <Row type="horizontal-center" padding="2rem">
        <SpinnerMini />
      </Row>
    );
  if (error) return <ErrorDisplay error={error} />;

  const { id, firstName, lastName, picture = DefaultUser } = userById;

  return (
    <StyledLink to={`/messages/${id}`}>
      <img src={picture} alt={`${firstName} image`} className="image-user" />
      <p>{fixedSizeFullName(firstName, lastName)}</p>
    </StyledLink>
  );
};

export default ConversationUser;

const StyledLink = styled(NavLink)`
  display: flex;
  margin-top: 1.5rem;
  justify-content: start;
  align-items: center;
  padding: 0 1.5rem;
  gap: 1.5rem;
  border-radius: 1.5rem;
  cursor: pointer;
  & > img {
    padding: 0.5rem;
    height: 6rem;
  }
  & > p {
    font-size: var(--font-size-big);
  }

  &:active,
  &.active:link,
  &.active:visited {
    background-color: var(--color-neutral-900);
  }
`;
