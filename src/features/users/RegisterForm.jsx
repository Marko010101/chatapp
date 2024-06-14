import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import Form from "../../ui/Form.jsx";
import FancyButton from "../../ui/FancyButton.jsx";
import Button from "../../ui/Button.jsx";
import { useSignup } from "./useSignup.js";
import { useFirebaseSignup } from "./useFirebaseSignup.js";
import { useUsers } from "./useUsers.js";
import { getUserById } from "../../services/apiUser.js";

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
  const { users, isLoading: usersDataLoading } = useUsers();

  const usersData = users?.data;

  let latestRegisteredId = null;

  if (!usersDataLoading && usersData !== 0) {
    const latestUser = usersData.at(-1);
    latestRegisteredId = latestUser.id;
  }
  console.log(latestRegisteredId);
  getUserById(latestRegisteredId)
  // Firebase registration
  const { mutate: signupWithFirebase, isLoading: isLoading1 } =
    useFirebaseSignup();

  const navigate = useNavigate();

  // after signupOnDUmmy on succes return signupWithFIrebase and pass the id which will be generated by signupDummy

  function onSubmit({ firstName, lastName, email, password }) {
    signupOnDummy(
      { firstName, lastName, email },
      {
        onSuccess: getUserById(latestRegisteredId),
      }
    );
    signupWithFirebase(
      { email, password },
      {
        onSuccess: () => {
          navigate("/");
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
