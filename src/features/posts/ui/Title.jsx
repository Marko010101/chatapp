import styled from "styled-components";
import { titleFix } from "../../../utils/helpers.js";

const StyledTitle = styled.span`
  font-weight: var(--font-weight-light);
  margin-left: 0.3rem;
  color: var(--color-gray-0);
`;

function Title({ text }) {
  return <StyledTitle>{titleFix(text)}</StyledTitle>;
}

export default Title;
