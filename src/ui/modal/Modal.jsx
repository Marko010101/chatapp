import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useOutsideClick } from "../../hooks/useOutsideClick.js";
import useWindowWidth from "../../hooks/useWindowWidth.js";
import StyledModalButton from "./StyledModalButton.jsx";
import StyledOverlay from "./StyledOverlay.jsx";
import StyledModal from "./StyledModal.jsx";
import { useDeletedPost } from "../../context/DeletedPostContext.jsx";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => {
    setOpenName("");
  };

  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { windowWidth } = useWindowWidth();
  const { deletedPostId } = useDeletedPost();
  const navigate = useNavigate();
  const { openName, close } = useContext(ModalContext);
  const handleOutsideClick = () => {
    if (!deletedPostId) navigate(-1);
    close();
  };
  const ref = useOutsideClick(handleOutsideClick);

  if (name !== openName) return null;

  return createPortal(
    <StyledOverlay>
      <StyledModal ref={ref}>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
      {windowWidth >= 993 && (
        <StyledModalButton onClick={close}>
          <HiXMark />
        </StyledModalButton>
      )}
    </StyledOverlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export { ModalContext };
export default Modal;
