import { useState } from "react";
import { useNavigate } from "react-router-dom";

import StyledButton from "../../ui/Buttons/StyledButton.jsx";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useLogin } from "./hooks/useLogin.js";
import SpinnerMini from "../../ui/loaders/SpinnerMini.jsx";
import FormRowVertical from "../../ui/FormRowVertical.jsx";
import Row from "../../ui/Row.jsx";
import FancyButton from "../../ui/Buttons/FancyButton.jsx";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }
  function handleTogglePasswordVisible() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical
        label="Password"
        isPassword={true}
        isPasswordVisible={isPasswordVisible}
        onClick={handleTogglePasswordVisible}
      >
        <Input
          type={isPasswordVisible ? "text" : "password"}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Row type="horizontal">
          {!isLoading ? (
            <FancyButton disabled={isLoading}>Sign in</FancyButton>
          ) : (
            <SpinnerMini />
          )}
          <StyledButton
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            Register
          </StyledButton>
        </Row>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
