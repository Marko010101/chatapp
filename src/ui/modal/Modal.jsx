import styled, { keyframes } from "styled-components";

import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWindowWidth from "../../hooks/useWindowWidth.js";
import StyledModalButton from "./StyledModalButton.jsx";
import StyledOverlay from "./StyledOverlay.jsx";
import StyledModal from "./StyledModal.jsx";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const navigate = useNavigate();
  const close = () => {
    setOpenName("");
    navigate(-1);
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
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  useEffect(() => {
    if (name === openName) {
      // Add class to body when modal opens
      document.body.style.overflow = "hidden";
    } else {
      // Remove class from body when modal closes
      document.body.style.overflow = "unset";
    }

    return () => {
      // Ensure the overflow style is removed when the component unmounts
      document.body.style.overflow = "unset";
    };
  }, [name, openName]);

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
