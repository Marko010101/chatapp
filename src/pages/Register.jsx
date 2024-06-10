import styled from "styled-components";
import RegisterForm from "../features/users/RegisterForm.jsx";

const RegisterLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 55rem;
  align-items: center;
  justify-content: center;
`;

function Register() {
  return (
    <RegisterLayout>
      <RegisterForm />
    </RegisterLayout>
  );
}

export default Register;
