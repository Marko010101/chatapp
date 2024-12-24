import styled from "styled-components";
import { collection, query, orderBy, limit } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { firestore } from "../constants/firebaseConfig.js";
import { useUserFirebase } from "../features/users/hooks/useUserFirebase.js";
import ChatMessage from "../features/chat/ChatMessage.jsx";
import Row from "../ui/Row.jsx";
import MessagesSidebar from "../features/chat/MessagesSidebar.jsx";
import MessageInput from "../features/chat/MessageInput.jsx";

function Messages() {
  const { user } = useUserFirebase();

  const messageRef = collection(firestore, "messages");

  const messagesQuery = query(messageRef, orderBy("createdAt"), limit(25));

  const [messages] = useCollectionData(messagesQuery, { idField: "id" });

  return (
    <StyledMessages type="horizontal-center">
      <Row>
        <MessagesSidebar />
      </Row>
      <StyledChatBox type="vertical" padding="2rem 3rem">
        <div>
          {messages &&
            messages.map((msg, index) => (
              <ChatMessage key={msg.id || index} message={msg} />
            ))}
        </div>
        <div>
          <MessageInput
            userId={user?.uid}
            chatId="ynVvYdPseFNvYWlVJADeTqcQSiD2"
          />
        </div>
      </StyledChatBox>
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
