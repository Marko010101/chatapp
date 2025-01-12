import styled, { css } from "styled-components";

const Form = styled.form`
  display: flex;
  gap: 2rem;
  padding: 2.4rem 4rem;
  background-color: var(--color-neutral-950);
  border: var(--border);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  font-size: var(--font-size-small);

  ${(props) =>
    props.type === "register" &&
    css`
      @media (max-width: 992px) {
        flex-direction: column;
        gap: 4rem;
      }
    `}
`;

export default Form;
