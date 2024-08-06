import styled from "styled-components";

export const ToggleButton = styled.span`
  position: absolute;
  right: 2.3rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }
`;
