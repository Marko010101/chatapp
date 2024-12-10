import { useContext, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import DummyUsersList from "../features/users/DummyUsersList.jsx";
import Modal, { ModalContext } from "../ui/modal/Modal.jsx";
import ModalPost from "../features/posts/ModalPost.jsx";

function AllPeople() {
  let { postId } = useParams();
  const { open } = useContext(ModalContext);
  useEffect(() => {
    if (postId) {
      open("modalPost");
    }
  }, [postId, open, close]);

  return (
    <>
      {postId && (
        <div>
          <Modal.Window name="modalPost">
            <ModalPost />
          </Modal.Window>
        </div>
      )}
      <StyledSugestions>
        <h4>Suggested</h4>
        <DummyUsersList isSuggestedPage={true} />
      </StyledSugestions>
    </>
  );
}

export default AllPeople;

const StyledSugestions = styled.div`
  padding: 5rem 0rem;

  h4 {
    font-weight: var(--font-weight-semibold);
  }
`;
