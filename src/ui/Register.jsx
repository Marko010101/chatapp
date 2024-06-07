import { useForm } from "react-hook-form";
import FormRow from "./FormRow.jsx";
import Input from "./Input.jsx";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../features/users/useSignup.js";
import Form from "./Form.jsx";
import { useUsers } from "../features/users/useUsers.js";
import { getUserById } from "../services/apiUser.js";
import FancyButton from "./FancyButton.jsx";
import Button from "./Button.jsx";

function Register() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm();
  const { signupOnDummy, isLoading } = useSignup();
  const navigate = useNavigate();

  const { users, error } = useUsers();

  console.log(users);

  // if (users) {
  //   const filteredUser = users.data.find(
  //     (user) => user.id === "66630e9895f0a78483d1578e"
  //   );
  //   console.log("Filtered user:", filteredUser);
  // }

  function onSubmit({ firstName, lastName, email }) {
    signupOnDummy(
      { firstName, lastName, email },
      {
        // onSuccess: () => navigate("/"),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="First name" error={errors?.firstName?.message}>
        <Input
          type="text"
          id="firstName"
          disabled={isLoading}
          {...register("firstName", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Last name" error={errors?.lastName?.message}>
        <Input
          type="text"
          id="lastName"
          disabled={isLoading}
          {...register("lastName", {
            required: "This field is required",
          })}
        />
      </FormRow>
      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>
      {/*       <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
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
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) =>
              value === getValues().password || "Passwords need to match",
          })}
        />
      </FormRow> */}
      <FormRow>
        <Button
          type="reset"
          disabled={isLoading}
          onClick={() => {
            reset();
          }}
        >
          Cancel
        </Button>
        <FancyButton type="submit" disabled={isLoading}>
          Join us!
        </FancyButton>
        {/* Add type="submit" to submit button */}
      </FormRow>
    </Form>
  );
}

export default Register;
