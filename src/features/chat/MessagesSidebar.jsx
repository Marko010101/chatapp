import styled, { keyframes } from "styled-components";
import { useChatCollectionId } from "./hooks/useChatCollectionId.js";
import ConversationUser from "./ConversationUser.jsx";
import { useParams } from "react-router-dom";

const MessagesSidebar = ({ currentUserId }) => {
  const { userId } = useParams(); // Assuming userId comes from the URL params
  const { chatCollectionId, isLoading, error } = useChatCollectionId();
  console.log(userId);

  if (isLoading) return <p>...Loading</p>;

  const userInChats = chatCollectionId?.some((el) => {
    const [user1, user2] = el.id.split("_");
    return user1 === userId || user2 === userId;
  });

  return (
    <StyledMessagesSidebar>
      <h2>Chats</h2>
      {!userInChats && userId && (
        <ConversationUser key={userId} receiverId={userId} />
      )}
      {chatCollectionId?.map((el) => {
        const { id } = el;
        const [user1, user2] = id.split("_");
        const receiverId = user1 === currentUserId ? user2 : user1;
        return <ConversationUser key={receiverId} receiverId={receiverId} />;
      })}
    </StyledMessagesSidebar>
  );
};

export default MessagesSidebar;

const slideIn = keyframes`
    from {
      left: -50%; 
    }
    to {
      left: var(--sidebar-width-shrunk); 
    }
  `;

const StyledMessagesSidebar = styled.div`
  position: fixed;
  width: var(--sidebar-width-messages);
  top: 0;
  left: var(--sidebar-width-shrunk);
  padding: 2rem 0;
  border-right: var(--border);
  height: 100vh;
  max-height: 100vh;
  animation: ${slideIn} 0.2s ease;
`;
