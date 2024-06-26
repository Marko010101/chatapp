import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import Form from "../../ui/Form.jsx";
import FancyButton from "../../ui/Buttons/FancyButton.jsx";
import Button from "../../ui/Buttons/Button.jsx";
import { useSignup } from "./useSignup.js";
import { useFirebaseSignup } from "./useFirebaseSignup.js";

function RegisterForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();

  // Dummy api user uploading
  const { signupOnDummy, isLoading: isLoading2 } = useSignup();

  // Firebase registration
  const { mutate: signupWithFirebase, isLoading: isLoading1 } =
    useFirebaseSignup();

  const navigate = useNavigate();

  // creating the dummyUser, on its success creating firebase user and passing id to it, ensuring that the dummyUser's ID matches firebase user's id

  function onSubmit({ firstName, lastName, email, password }) {
    signupOnDummy(
      { firstName, lastName, email },
      {
        onSuccess: async (data) => {
          const { id: dummyId } = await data;
          console.log("dummyId", dummyId);
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
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading1 || isLoading2}
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRow>
      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading1 || isLoading2}
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
        {/* Add type="submit" to submit button */}
      </FormRow>
    </Form>
  );
}

export default RegisterForm;
