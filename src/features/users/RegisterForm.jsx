import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import styled from "styled-components";

import { FaRegArrowAltCircleDown } from "react-icons/fa";

import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import Form from "../../ui/Form.jsx";
import FancyButton from "../../ui/Buttons/FancyButton.jsx";
import StyledButton from "../../ui/Buttons/StyledButton.jsx";
import { useSignup } from "./hooks/useSignup.js";
import { useFirebaseSignup } from "./hooks/useFirebaseSignup.js";
import ErrorDisplay from "../../ui/ErrorDisplay.jsx";
import Upload from "../../ui/Upload.jsx";
import Row from "../../ui/Row.jsx";
import { uploadFileToCloudinary } from "../../constants/Cloudinary.js";

function RegisterForm() {
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    clearErrors,
    setError,
    reset,
    watch,
    getValues,
  } = useForm();
  const [previewImage, setPreviewImage] = useState(watch("image") || null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRepeatPasswordVisible, setIsRepeatPasswordVisible] = useState(false);

  const { signupOnDummy, isPending: isLoading2, error } = useSignup();
  const { mutate: signupWithFirebase, isPending: isLoading1 } =
    useFirebaseSignup();

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleRepeatPasswordVisibility = () => {
    setIsRepeatPasswordVisible(!isRepeatPasswordVisible);
  };

  const handleFileChange = (file) => {
    if (file) {
      const validTypes = ["image/png", "image/jpeg", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("image", {
          message: "Invalid file type. Only PNG, JPG, or WEBP allowed.",
        });
        setPreviewImage(URL.createObjectURL(file));
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setError("image", { message: "File size exceeds 2MB." });
        setPreviewImage(URL.createObjectURL(file));
        return;
      }
      setPreviewImage(URL.createObjectURL(file));
      setValue("image", file);
      clearErrors("image");
    } else {
      setPreviewImage(null);
      setValue("image", null);
    }
  };

  const handleFileDelete = () => {
    setPreviewImage(null);
    setValue("image", null); // Set image to null
    clearErrors("image"); // Clear any existing image errors
  };

  // creating the dummyUser, on its success creating firebase user and passing id to it, ensuring that the dummyUser's ID matches firebase user's id

  async function onSubmit({ firstName, lastName, image, email, password }) {
    try {
      let picture;
      if (image) picture = await uploadFileToCloudinary(image);
      signupOnDummy(
        { firstName, lastName, email, picture },
        {
          onSuccess: async (data) => {
            const { id: dummyId } = data;
            return signupWithFirebase(
              { email, password, dummyId },
              {
                onSuccess: () => navigate("/"),
              }
            );
          },
        }
      );
    } catch (err) {
      setError("image", {
        message: "Failed to upload the image. Please try again.",
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type="register">
      <StyledUploadRow>
        <StyledLabel as="label" type="horizontal-center" htmlFor="image-upload">
          Upload Image (Optional) <FaRegArrowAltCircleDown size={18} />
        </StyledLabel>
        <Upload
          value={previewImage}
          onChange={handleFileChange}
          handleDelete={handleFileDelete}
          name="image-upload"
          isError={Boolean(errors.image)}
          setError={(error) => setError("image", { message: error })}
        />
        {errors?.image && <ErrorDisplay error={errors.image} padding="2rem" />}
      </StyledUploadRow>
      <StyledForm>
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
        <ErrorDisplay error={error} padding="0rem" />
        <FormRow>
          <StyledButton
            type="reset"
            disabled={isLoading1 || isLoading2}
            onClick={() => {
              reset();
              setPreviewImage(null);
              navigate("/login");
            }}
          >
            {"Cancel"}
          </StyledButton>

          <FancyButton type="submit" disabled={isLoading1 || isLoading2}>
            {isLoading1 || isLoading2 ? "Processing..." : "Join us!"}
          </FancyButton>
        </FormRow>
      </StyledForm>
    </Form>
  );
}

export default RegisterForm;

const StyledUploadRow = styled(Row)`
  min-width: 30rem;
  max-width: 70rem;
  max-height: 50rem;

  @media (max-width: 778px) {
    max-width: 40rem;
  }

  & img {
    max-height: 47rem;

    @media (max-width: 992px) {
      max-height: 15rem;
    }
  }
`;

const StyledForm = styled(Row)`
  border-left: var(--border);
  padding-left: 2rem;
  width: max-content;
`;

const StyledLabel = styled(Row)`
  margin: 0 auto;
  width: max-content;
  gap: 2rem;
  padding-bottom: 1rem;
  cursor: pointer;
`;
