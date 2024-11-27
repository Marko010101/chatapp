import styled from "styled-components";
import RegisterForm from "../features/users/RegisterForm.jsx";
import backgroundImage from "../assets/registerImage.jpg";

const RegisterLayout = styled.main`
  min-height: 100vh;
  display: grid;
  align-items: center;
  justify-content: center;

  background-image: url(${backgroundImage});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  & form {
    background-color: rgba(0, 0, 0, 0.8);
    border: none;
    box-shadow: 1.5rem 1.5rem 1.5rem rgba(0, 0, 0, 0.5);
  }
`;

function Register() {
  return (
    <RegisterLayout>
      <RegisterForm />
    </RegisterLayout>
  );
}

export default Register;
