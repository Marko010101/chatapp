import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useChatCollectionId } from "./hooks/useChatCollectionId.js";
import ConversationUser from "./ConversationUser.jsx";
import ErrorDisplay from "../../ui/ErrorDisplay.jsx";

const MessagesSidebar = ({ currentUserId }) => {
  const { userId } = useParams();
  const { chatCollectionId, isLoading, error } = useChatCollectionId();

  const [sortedChats, setSortedChats] = useState([]);

  useEffect(() => {
    if (chatCollectionId) {
      const filteredChats = chatCollectionId.filter((el) => {
        const [user1, user2] = el.id.split("_");
        return user1 === currentUserId || user2 === currentUserId;
      });

      const sorted = filteredChats.sort((a, b) => {
        const aUpdatedAt = a.updatedAt || 0;
        const bUpdatedAt = b.updatedAt || 0;

        return bUpdatedAt - aUpdatedAt;
      });

      setSortedChats(sorted);
    }
  }, [chatCollectionId, currentUserId]);

  if (isLoading) return <p>...Loading</p>;
  if (error) return <ErrorDisplay error={error} />;

  const isUserIdInChats = sortedChats?.some((el) => {
    const [user1, user2] = el.id.split("_");
    return user1 === userId || user2 === userId;
  });

  return (
    <StyledMessagesSidebar>
      <h2>Chats</h2>

      {!isUserIdInChats && userId && (
        <ConversationUser key={userId} receiverId={userId} />
      )}

      {sortedChats?.map((el) => {
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
  overflow-y: auto;
  & > h2 {
    padding: 0 0 1rem 2rem;
    border-bottom: var(--border);
  }
`;
