import styled, { css } from "styled-components";

const Form = styled.form`
  padding: 2.4rem 4rem;
  background-color: var(--color-neutral-950);
  border: var(--border);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  font-size: var(--font-size-small);

  ${(props) =>
    props.type === "register" &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `}

  @media (max-width: 768px) {
    /* width: 100%; */
  }
  @media (max-width: 576px) {
    padding: 2rem 1.2rem;
  }
`;

export default Form;
