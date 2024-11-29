import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { z } from "zod";
import { useForm } from "react-hook-form";

import { HiXMark } from "react-icons/hi2";
import { FaRegArrowAltCircleDown } from "react-icons/fa";

import StyledModal from "../../ui/modal/StyledModal.jsx";
import StyledOverlay from "../../ui/modal/StyledOverlay.jsx";
import { useOutsideClick } from "../../hooks/useOutsideClick.js";
import StyledModalButton from "../../ui/modal/StyledModalButton.jsx";
import Upload from "../../ui/Upload.jsx";
import FancyButton from "../../ui/Buttons/FancyButton.jsx";

const schema = z.object({
  image: z
    .string()
    .url({ message: "Image must be a valid URL" })
    .nonempty({ message: "Image is required" }),
  text: z
    .string()
    .min(6, { message: "Minimum 6 characters required" })
    .max(50, { message: "Maximum 50 characters allowed" }),
});

const CreatePost = ({ onClose }) => {
  const ref = useOutsideClick(onClose);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  console.log(errors);

  const [previewImage, setPreviewImage] = useState(null);

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
    setError("image", { message: "File is required" });
  };

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    onClose();
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

          <FancyButton type="submit" disabled={isSubmitting}>
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
