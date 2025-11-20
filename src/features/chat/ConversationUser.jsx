import { BiTrashAlt } from "react-icons/bi";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import DefaultUser from "../../assets/default-user.jpg";
import Row from "../../ui/Row.jsx";
import SpinnerMini from "../../ui/loaders/SpinnerMini.jsx";
import { fixedSizeFullName } from "../../utils/fixedSizeFullName.js";
import { useUserById } from "../users/hooks/useUserById.js";
import { useDeleteChat } from "./hooks/useDeleteChat.js";

const ConversationUser = ({ receiverId, currentUserId }) => {
  const navigate = useNavigate();
  const { mutate: deleteChat } = useDeleteChat();
  const { userById, isLoading, error } = useUserById(receiverId);

  if (isLoading)
    return (
      <Row type="horizontal-center" padding="2rem">
        <SpinnerMini />
      </Row>
    );
  if (error) return null;

  const { id, firstName, lastName, picture = DefaultUser } = userById;

  // chat ID must be sorted lexicographically
  const chatId =
    currentUserId < receiverId
      ? `${currentUserId}_${receiverId}`
      : `${receiverId}_${currentUserId}`;

  const handleDeleteChat = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm("Are you sure you want to delete this chat?")) return;

    deleteChat(chatId, {
      onSuccess: () => {
        navigate("/messages");
      },
    });
  };

  return (
    <StyledLink to={`/messages/${receiverId}`}>
      <img src={picture} alt={`${firstName} image`} className="image-user" />
      <p>{fixedSizeFullName(firstName, lastName)}</p>
      <BiTrashAlt className="delete-icon" onClick={handleDeleteChat} />
    </StyledLink>
  );
};
export default ConversationUser;

const StyledLink = styled(NavLink)`
  display: flex;
  margin-top: 1.5rem;
  justify-content: space-between;
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
    flex: 1;
  }

  .delete-icon {
    font-size: 2rem;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;
    padding: 0.5rem;
    height: 2.7rem;
    width: 2.7rem;
    :hover {
      color: var(--color-red-400);
    }
  }

  &:hover .delete-icon {
    opacity: 1;
    pointer-events: auto;
  }

  &.active .delete-icon {
    opacity: 1;
    pointer-events: auto;
  }

  &:active,
  &.active:link,
  &.active:visited {
    background-color: var(--color-neutral-900);
  }
`;
