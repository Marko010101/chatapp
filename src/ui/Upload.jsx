import styled from "styled-components";

import PlusCircle from "../assets/plus-circle.svg?react";
import Delete from "../assets/delete.svg?react";
import Row from "./Row.jsx";

const FileUploadWrapper = styled(Row)`
  height: 100%;
  border: 0.1rem dashed
    ${(props) =>
      props.isError ? "var(--color-primary)" : "var(--color-cloudy-gray)"};
  border-radius: 2rem;
  border: 1px dotted var(--color-neutral-700);

  & > div {
    position: relative;
    display: flex;
  }

  & img {
    object-fit: cover;
    border-radius: 0.4rem;
    margin: 0;
  }

  & span {
    position: absolute;
    left: 50%;
    bottom: -1.8rem;
    transform: translateX(-50%);
    cursor: pointer;
  }

  & label {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  & input {
    display: none;
  }
`;

const Upload = ({ value, onChange, handleDelete, name, isError, setError }) => {
  const onFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setError(null);
      onChange(file);
    }
  };

  const onDeleteClick = (e) => {
    e.stopPropagation();
    handleDelete();
  };

  return value ? (
    <FileUploadWrapper
      type="horizontal-center"
      className="group"
      isError={isError}
    >
      <div>
        <img src={value} alt={`${name}`} />
        <span onClick={onDeleteClick}>
          <Delete />
        </span>
      </div>
    </FileUploadWrapper>
  ) : (
    <FileUploadWrapper type="horizontal-center" isError={isError}>
      <label htmlFor={name}>
        <PlusCircle />
        <input
          id={name}
          type="file"
          accept=".png, .jpg, .jpeg, .webp"
          onChange={onFileChange}
        />
      </label>
    </FileUploadWrapper>
  );
};

export default Upload;
