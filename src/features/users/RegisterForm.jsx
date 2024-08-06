import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import Form from "../../ui/Form.jsx";
import FancyButton from "../../ui/Buttons/FancyButton.jsx";
import Button from "../../ui/Buttons/Button.jsx";
import { useSignup } from "./hooks/useSignup.js";
import { useFirebaseSignup } from "./hooks/useFirebaseSignup.js";

function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);

  // Dummy api user uploading
  const { signupOnDummy, isLoading: isLoading2 } = useSignup();

  // Firebase registration
  const { mutate: signupWithFirebase, isLoading: isLoading1 } =
    useFirebaseSignup();

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleRepeatPasswordVisibility = () => {
    setIsRepeatPasswordVisible(!isRepeatPasswordVisible);
  };
  // creating the dummyUser, on its success creating firebase user and passing id to it, ensuring that the dummyUser's ID matches firebase user's id

  function onSubmit({ firstName, lastName, email, password }) {
    signupOnDummy(
      { firstName, lastName, email },
      {
        onSuccess: async (data) => {
          const { id: dummyId } = await data;
          return signupWithFirebase(
            { email, password, dummyId },
            {
              onSuccess: () => navigate("/"),
            }
          );
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="register">
      <FormRow label="First name" error={errors?.firstName?.message}>
        <Input
          type="text"
          id="firstName"
          disabled={isLoading1 || isLoading2}
          {...register("firstName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Last name" error={errors?.lastName?.message}>
        <Input
          type="text"
          id="lastName"
          disabled={isLoading1 || isLoading2}
          {...register("lastName", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading1 || isLoading2}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
        isPassword={true}
        isPasswordVisible={isPasswordVisible}
        onClick={togglePasswordVisibility}
      >
        <Input
          type={isPasswordVisible ? "text" : "password"}
          id="password"
          disabled={isLoading1 || isLoading2}
          autoComplete="true"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>
      <FormRow
        label="Repeat password"
        error={errors?.passwordConfirm?.message}
        isPassword={true}
        isPasswordVisible={isRepeatPasswordVisible}
        onClick={toggleRepeatPasswordVisibility}
      >
        <Input
          type={isRepeatPasswordVisible ? "text" : "password"}
          id="passwordConfirm"
          disabled={isLoading1 || isLoading2}
          autoComplete="true"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          disabled={isLoading1 || isLoading2}
          onClick={() => {
            reset();
            navigate("/login");
          }}
        >
          Cancel
        </Button>
        <FancyButton type="submit" disabled={isLoading1 || isLoading2}>
          Join us!
        </FancyButton>
      </FormRow>
    </Form>
  );
}

export default RegisterForm;
