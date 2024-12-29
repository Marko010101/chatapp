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

function Messages() {
  const { currentUser = {}, isLoading, error } = useCurrentDummyUser();
  const { userId } = useParams();
  const chatId = [currentUser.id, userId].sort().join("_");
  const messagesRef = collection(firestore, `chats/${chatId}/messages`);
  const messagesQuery = query(
    messagesRef,
    orderBy("createdAt", "asc"),
    limit(25)
  );
  const [messages] = useCollectionData(messagesQuery, { idField: "id" });

  return (
    <StyledMessages type="horizontal-center">
      <Row>
        <MessagesSidebar currentUserId={currentUser.id} />
      </Row>
      {userId && (
        <StyledChatBox type="vertical" padding="2rem 3rem">
          <div>
            {messages &&
              messages.map((msg, index) => (
                <ChatMessage
                  key={msg.id || index}
                  message={msg}
                  currentUserId={currentUser?.id}
                />
              ))}
          </div>
          <div>
            <MessageInput userId={currentUser.id} chatId={userId} />
          </div>
        </StyledChatBox>
      )}
    </StyledMessages>
  );
}

export default Messages;

const StyledMessages = styled.div`
  width: 100vw;
  position: relative;
`;

const StyledChatBox = styled(Row)`
  margin-left: calc(
    var(--sidebar-width-shrunk) + var(--sidebar-width-messages)
  );
  height: 100vh;
  justify-content: space-between;
`;
