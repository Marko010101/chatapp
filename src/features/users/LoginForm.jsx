import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import { useLogin } from "./useLogin.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import FormRowVertical from "../../ui/FormRowVertical.jsx";
import Row from "../../ui/Row.jsx";
import FancyButton from "../../ui/FancyButton.jsx";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();
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
      <FormRowVertical label="Password">
        <Input
          type="password"
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
          <Button
            onClick={(e) => {
              e.preventDefault();
              navigate("/register");
            }}
          >
            Register
          </Button>
        </Row>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
