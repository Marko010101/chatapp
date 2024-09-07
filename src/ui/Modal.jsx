import styled, { keyframes } from "styled-components";

import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const slideDown = keyframes`
  0% {
    transform: translate(-50%, -100%);
    opacity: 0;
  }
  100% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  transition: all 0.5s;
  background-color: var(--color-black);
  animation: ${slideDown} 0.2s ease-out;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(3px);
  z-index: 600;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-neutral-900);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

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
    <Overlay>
      <StyledModal ref={ref}>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
      <Button onClick={close}>
        <HiXMark />
      </Button>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export { ModalContext };
export default Modal;
