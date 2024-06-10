import styled from "styled-components";
import LoginForm from "../features/users/LoginForm.jsx";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-items: center;
  justify-content: center;

  gap: 3.2rem;

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
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
