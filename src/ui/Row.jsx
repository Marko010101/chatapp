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
    props.type === "horizontal-center" &&
    css`
      justify-content: center;
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
    props?.margin &&
    css`
      margin: ${props.margin};
    `}

    ${(props) =>
    props?.padding &&
    css`
      padding: ${props.padding};
    `}

    ${(props) =>
    props?.gap &&
    css`
      gap: ${props.gap};
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
