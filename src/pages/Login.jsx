import styled from "styled-components";
import LoginForm from "../features/users/LoginForm.jsx";
import LogoText from "../ui/LogoText";
const LoginLayout = styled.main`
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  margin: 0 auto;
  justify-content: center;
  width: 45rem;
  padding-bottom: 7rem;

  /* @media (max-width: 576px) {
    grid-template-columns: 0.8fr;
  }

  @media (max-width: 768px) {
    grid-template-rows: 25rem 0 30rem;
    grid-gap: 10rem;
  }

  @media (max-width: 320px) {
    grid-template-columns: 0.95fr;
  } */
`;

function Login() {
  return (
    <LoginLayout>
      <LogoText />
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
