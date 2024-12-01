import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { object, z } from "zod";
import { useForm } from "react-hook-form";

import { HiXMark } from "react-icons/hi2";
import { FaRegArrowAltCircleDown } from "react-icons/fa";

import StyledModal from "../../ui/modal/StyledModal.jsx";
import StyledOverlay from "../../ui/modal/StyledOverlay.jsx";
import { useOutsideClick } from "../../hooks/useOutsideClick.js";
import StyledModalButton from "../../ui/modal/StyledModalButton.jsx";
import Upload from "../../ui/Upload.jsx";
import FancyButton from "../../ui/Buttons/FancyButton.jsx";
import { useCurrentDummyUser } from "../users/hooks/useCurrentDummyUser.js";
import { uploadFileToCloudinary } from "../../constants/Cloudinary.js";
import { useCreatePost } from "./hooks/useCreatePost.js";

const schema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "Image is required",
    })
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      {
        message: "Only .jpeg, .png, or .webp files are allowed",
      }
    ),
  text: z
    .string()
    .min(6, { message: "Minimum 6 characters required" })
    .max(50, { message: "Maximum 50 characters allowed" }),
});

const CreatePost = ({ onClose }) => {
  const ref = useOutsideClick(onClose);
  const { currentUser, isLoading, error } = useCurrentDummyUser();
  const { createUserPost, isLoading: isLoadingCreateUser } = useCreatePost(
    currentUser.id
  );
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [previewImage, setPreviewImage] = useState(watch("image"));

  const handleFileChange = (file) => {
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setValue("image", file);
      clearErrors("image");
    }
  };

  const handleFileDelete = () => {
    setPreviewImage(null);
    setValue("image", null);
    setError("image", { message: "Image is required" });
  };

  const onSubmit = async (formData) => {
    console.log("formData", formData);
    try {
      const { image, text } = formData;

      if (!image) {
        throw new Error("No image selected.");
      }

      // Upload image to Cloudinary or other service
      const imageUrl = await uploadFileToCloudinary(image);

      const postPayload = {
        text,
        image: imageUrl,
        likes: 0,
        tags: ["example-tag"],
        owner: currentUser.id,
      };

      await createUserPost(postPayload);

      onClose();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <StyledOverlay>
      <StyledModal ref={ref}>
        <StyledBox onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="image-upload">
              Upload Image <FaRegArrowAltCircleDown size={18} />
            </label>
            <Upload
              value={previewImage}
              onChange={handleFileChange}
              handleDelete={handleFileDelete}
              name="image-upload"
              isError={Boolean(errors.image)}
              setError={(error) => setError("image", { message: error })}
              register={register}
            />
            {errors.image && (
              <ErrorMessage>{errors.image.message}</ErrorMessage>
            )}
          </div>

          <div>
            <label>Description:</label>
            <div>
              <textarea
                {...register("text")}
                placeholder="Add a description..."
              />
              {errors.text && (
                <ErrorMessage>{errors.text.message}</ErrorMessage>
              )}
            </div>
          </div>

          <FancyButton type="submit" disabled={isSubmitting || isLoading}>
            Create post
          </FancyButton>
        </StyledBox>
        <StyledModalButton onClick={onClose}>
          <HiXMark />
        </StyledModalButton>
      </StyledModal>
    </StyledOverlay>
  );
};

export default CreatePost;

const StyledBox = styled.form`
  height: 50rem;
  width: 70rem;
  display: grid;
  grid-template-columns: 1fr 30rem;
  grid-template-rows: 1fr 6rem;

  & > div {
    display: flex;
    flex-direction: column;
    padding: 3rem 2rem;

    & > div {
      margin: auto 0;
    }

    & > label {
      display: flex;
      align-items: center;
      margin: 0 auto;
      width: max-content;
      gap: 2rem;
      padding-bottom: 1rem;
      cursor: pointer;
    }
  }

  & > div:first-child {
    grid-row: -1/1;
    border-right: var(--border);
  }

  & textarea {
    width: 100%;
    height: 15rem;
    max-height: 20rem;
    border-radius: 2rem;
    resize: none;
    padding: 1rem;

    color: var(--color-black);
    background-color: var(--color-neutral-300);
  }

  & button {
    height: 3rem;
    width: max-content;
    grid-column: 2/3;
    align-self: center;
    justify-self: center;
  }

  & img {
    max-height: 39rem;
  }
`;

const ErrorMessage = styled.p`
  color: var(--color-red-400);
  font-size: var(--font-size-small);
  padding: 1rem;
  align-self: center;
`;
