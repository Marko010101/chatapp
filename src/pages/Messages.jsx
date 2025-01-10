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
import SpinnerFullPage from "../ui/loaders/SpinnerFullPage.jsx";
import EmptyChat from "../features/chat/EmptyChat.jsx";
import { useUserById } from "../features/users/hooks/useUserById.js";
import ChatHeader from "../features/chat/ChatHeader.jsx";
import SpinnerGrayMini from "../ui/loaders/SpinnerGrayMini.jsx";

function Messages() {
  const { currentUser = {}, isLoading, error } = useCurrentDummyUser();
  const { userId } = useParams();
  const {
    userById,
    isLoading: isLoadingChatUser,
    error: errorChatUser,
  } = useUserById(userId);
  const chatContainerRef = useRef(null);
  const chatId = [currentUser.id, userId].sort().join("_");
  const { refetch, isLoading: fetchingCollection } = useChatCollectionId();
  const messagesRef = collection(firestore, `chats/${chatId}/messages`);
  const messagesQuery = query(
    messagesRef,
    orderBy("createdAt", "asc"),
    limit(25)
  );
  const [messages, loading] = useCollectionData(messagesQuery, {
    idField: "id",
  });
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

  if (fetchingCollection || isLoading || isLoadingChatUser)
    return <SpinnerFullPage />;
  return (
    <StyledMessages type="horizontal-center">
      <Row>
        <MessagesSidebar currentUserId={currentUser.id} />
      </Row>
      {userId && (
        <>
          <ChatHeader user={userById} />
          <StyledChatBox type="vertical" padding="1rem 0">
            <div
              ref={chatContainerRef}
              style={{ overflowY: "auto", flexGrow: 1 }}
            >
              {loading ? (
                <StyledSpinnerBox type="horizontal-center">
                  <SpinnerGrayMini />
                </StyledSpinnerBox>
              ) : messages?.length ? (
                messages.map((msg, index) => (
                  <ChatMessage
                    key={msg.id || index}
                    message={msg}
                    currentUserId={currentUser?.id}
                  />
                ))
              ) : (
                <EmptyChat user={userById} />
              )}
            </div>
            <MessageInput
              userId={currentUser.id}
              chatId={userId}
              chatContainerRef={chatContainerRef}
            />
          </StyledChatBox>
        </>
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
  position: relative;
`;

const StyledChatBox = styled(Row)`
  position: relative;
  flex-grow: 1;
  margin-left: calc(
    var(--sidebar-width-shrunk) + var(--sidebar-width-messages)
  );
  padding-bottom: 7.5rem;
  padding-top: 11rem;
  justify-content: space-between;
  overflow: hidden;
`;

const StyledSpinnerBox = styled(Row)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
