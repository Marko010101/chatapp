import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
    props.type === "horizontal" &&
    css`
      justify-content: space-between;
      align-items: center;
    `}
  ${(props) =>
    props.type === "horizontal-around" &&
    css`
      justify-content: space-around;
      align-items: center;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
    `}

    ${(props) =>
    props?.mt &&
    css`
      margin-top: ${props.mt};
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
