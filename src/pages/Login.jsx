import styled, { css } from "styled-components";

import LoginForm from "../features/users/LoginForm.jsx";
import LogoText from "../ui/LogoText";
import dogImage from "../assets/loginImage.jpg";
import useWindowWidth from "../hooks/useWindowWidth.js";

function Login() {
  const { windowWidth } = useWindowWidth();
  const isSmallDevice = windowWidth <= 768;

  return (
    <LoginLayout isSmallDevice={isSmallDevice}>
      <div>
        {isSmallDevice ? (
          <ImageBox isSmallDevice={isSmallDevice}>
            <StyledSpan isSmallDevice={isSmallDevice}>
              Sharing Moments, One Paw at a Time.
            </StyledSpan>
          </ImageBox>
        ) : (
          <ImageBox isSmallDevice={isSmallDevice}>
            <StyledSpan>Sharing Moments, One Paw at a Time.</StyledSpan>
            <img src={dogImage} alt="login image" />
          </ImageBox>
        )}

        <LoginBox isSmallDevice={isSmallDevice}>
          <LogoText />
          <LoginForm />
        </LoginBox>
      </div>
    </LoginLayout>
  );
}

export default Login;

const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;

  width: ${(props) => (props.isSmallDevice ? "100%" : "max-content")};
  background-image: ${(props) =>
    props.isSmallDevice ? `url(${dogImage})` : "none"};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  & > div {
    display: flex;
    border: ${(props) => (props.isSmallDevice ? "none" : "var(--border)")};
    border-radius: 2rem;
    align-items: space-between;
  }
`;

const ImageBox = styled.div`
  position: ${(props) => (props.isSmallDevice ? "static" : "relative")};

  & img {
    width: 40rem;
    border-radius: 2rem;
    overflow: hidden;
    padding: 1rem;
  }
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;

  border-left: ${(props) => (props.isSmallDevice ? "none" : "var(--border)")};
  ${(props) =>
    props.isSmallDevice &&
    css`
      margin: 0 auto;
    `}

  ${(props) =>
    props.isSmallDevice &&
    css`
      background-color: rgba(0, 0, 0, 0.7);
      border-radius: 3rem;
    `}
    

  & form {
    width: ${(props) => (props.isSmallDevice ? "75vw" : "40rem")};
    display: flex;
    flex-direction: column;
    border: none;
    margin: auto 1rem;

    background-color: ${(props) =>
      props.isSmallDevice ? "transparent" : "var(--color-neutral-950)"};
  }
`;

const StyledSpan = styled.span`
  position: absolute;
  z-index: 10;
  bottom: 12rem;
  left: 8rem;
  width: max-content;
  padding: 0.5rem;
  rotate: -15deg;

  backdrop-filter: blur(1px);
  font-family: "Amatic SC", sans-serif;
  font-size: var(--font-size-huge);
  font-style: normal;
`;
