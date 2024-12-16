import { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

import { HiXMark } from "react-icons/hi2";
import { FaRegArrowAltCircleDown } from "react-icons/fa";

import StyledErrorText from "../../../ui/StyledErrorText.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import Row from "../../../ui/Row.jsx";
import postSchema from "../../../validation/postSchema.js";
import { useOutsideClick } from "../../../hooks/useOutsideClick.js";
import StyledOverlay from "../../../ui/modal/StyledOverlay.jsx";
import StyledModal from "../../../ui/modal/StyledModal.jsx";
import Upload from "../../../ui/Upload.jsx";
import FancyButton from "../../../ui/Buttons/FancyButton.jsx";
import StyledModalButton from "../../../ui/modal/StyledModalButton.jsx";

const PostForm = ({
  onClose,
  onSubmit,
  initialValues = {},
  isSubmitting = false,
  isLoading = false,
}) => {
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: initialValues,
  });

  const [previewImage, setPreviewImage] = useState(watch("image"));
  const ref = useOutsideClick(!isSubmitting ? onClose : undefined);

  useEffect(() => {
    if (initialValues.image) {
      setPreviewImage(initialValues.image);
    }
  }, [initialValues.image]);

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

  return (
    <StyledOverlay>
      <StyledModal ref={ref}>
        <StyledBox onSubmit={handleSubmit(onSubmit)}>
          <Row type="vertical">
            <StyledLabel
              as="label"
              type="horizontal-center"
              htmlFor="image-upload"
            >
              Upload Image <FaRegArrowAltCircleDown size={18} />
            </StyledLabel>
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
          </Row>

          <Row type="vertical">
            <StyledLabel
              htmlFor="description"
              as="label"
              type="horizontal-center"
            >
              Description:
            </StyledLabel>
            <div>
              <textarea
                id="description"
                {...register("text")}
                placeholder="Add a description..."
              />
              {errors.text && (
                <ErrorMessage>{errors.text.message}</ErrorMessage>
              )}
            </div>
          </Row>

          <FancyButton type="submit" disabled={isSubmitting || isLoading}>
            {initialValues.id ? "Update Post" : "Create Post"}
          </FancyButton>
        </StyledBox>
        <StyledModalButton onClick={onClose}>
          <HiXMark />
        </StyledModalButton>
      </StyledModal>
    </StyledOverlay>
  );
};

export default PostForm;

const StyledBox = styled.form`
  height: 50rem;
  width: 70rem;
  display: grid;
  grid-template-columns: 1fr 30rem;
  grid-template-rows: 1fr 6rem;

  & > div {
    padding: 3rem 2rem;

    & > div {
      margin: auto 0;
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

const StyledLabel = styled(Row)`
  margin: 0 auto;
  width: max-content;
  gap: 2rem;
  padding-bottom: 1rem;
  cursor: pointer;
`;

const ErrorMessage = styled(StyledErrorText)`
  text-align: center;
  padding-top: 1rem;
`;
