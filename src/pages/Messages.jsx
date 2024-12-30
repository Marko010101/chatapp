import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firestore } from "../constants/firebaseConfig.js";
import ChatMessage from "../features/chat/ChatMessage.jsx";
import Row from "../ui/Row.jsx";
import MessagesSidebar from "../features/chat/MessagesSidebar.jsx";
import MessageInput from "../features/chat/MessageInput.jsx";
import { useCurrentDummyUser } from "../features/users/hooks/useCurrentDummyUser.js";
import { useChatCollectionId } from "../features/chat/hooks/useChatCollectionId.js";
import SpinnerMini from "../ui/loaders/SpinnerMini.jsx";

function Messages() {
  const { currentUser = {}, isLoading, error } = useCurrentDummyUser();
  const { userId } = useParams();
  const chatContainerRef = useRef(null);
  const chatId = [currentUser.id, userId].sort().join("_");
  const { refetch, isLoading: fetchingCollection } = useChatCollectionId();
  const messagesRef = collection(firestore, `chats/${chatId}/messages`);
  const messagesQuery = query(
    messagesRef,
    orderBy("createdAt", "asc"),
    limit(25)
  );
  const [messages] = useCollectionData(messagesQuery, { idField: "id" });

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }

    if (messages?.length) {
      refetch();
    }
  }, [messages, refetch]);

  if (fetchingCollection || isLoading) return <SpinnerMini />;

  return (
    <StyledMessages type="horizontal-center">
      <Row>
        <MessagesSidebar currentUserId={currentUser.id} />
      </Row>
      {userId && (
        <StyledChatBox type="vertical" padding="1rem 0">
          <div
            ref={chatContainerRef}
            style={{ overflowY: "auto", flexGrow: 1 }}
          >
            {messages &&
              messages.map((msg, index) => (
                <ChatMessage
                  key={msg.id || index}
                  message={msg}
                  currentUserId={currentUser?.id}
                />
              ))}
          </div>
          <MessageInput
            userId={currentUser.id}
            chatId={userId}
            chatContainerRef={chatContainerRef}
          />
        </StyledChatBox>
      )}
    </StyledMessages>
  );
}

export default Messages;

const StyledMessages = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledChatBox = styled(Row)`
  position: relative;
  flex-grow: 1;
  margin-left: calc(
    var(--sidebar-width-shrunk) + var(--sidebar-width-messages)
  );
  padding-bottom: 7.5rem;
  justify-content: space-between;
  overflow: hidden;
`;
