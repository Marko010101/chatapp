import styled, { css } from "styled-components";
import { getFormattedDateInfo } from "../../utils/helpers.js";
import { Tooltip } from "react-tooltip";

const StyledFormatedDate = styled.div`
  & a {
    font-size: var(--font-size-small);
    color: var(--color-gray-text);
    ${(props) =>
      props.isModalComment &&
      css`
        font-size: var(--font-size-mini) !important;
      `}
  }
`;

const StyledTooltip = styled(Tooltip)`
  font-size: var(--font-size-tiny) !important;
  padding: 1rem !important;
  border-radius: var(--border-radius-tiny) !important;
  border-top: 1px solid var(--color-gray-100) !important;
  border-left: 1px solid var(--color-gray-100) !important;
  ${(props) =>
    props.isModalComment &&
    css`
      padding: 0.5rem !important;
      font-size: var(--font-size-mini) !important;
    `}

  &.__react_component_tooltip {
    padding: 0 !important;
  }

  .__react_component_tooltip div {
    padding: 0 !important;
  }
`;

function PostFormatedDate({ date, isModalComment }) {
  const { relativeTime, formattedDate } = getFormattedDateInfo(date);
  return (
    <StyledFormatedDate isModalComment={isModalComment}>
      <a data-tooltip-id="formatedDate" data-tooltip-content={formattedDate}>
        {relativeTime}
      </a>
      <StyledTooltip
        isModalComment={isModalComment}
        id="formatedDate"
        place={isModalComment ? "right-start" : "top"}
        effect="solid"
        delayShow={400}
      />
    </StyledFormatedDate>
  );
}

export default PostFormatedDate;
