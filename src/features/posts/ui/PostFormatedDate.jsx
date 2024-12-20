import styled, { css } from "styled-components";
import { Tooltip } from "react-tooltip";
import { getFormattedDate } from "../../../utils/getFormattedDate.js";
import { getRelativeTime } from "../../../utils/getRelativeTime.js";
import { getTimeDifferences } from "../../../utils/getTimeDifferences.js";

function PostFormatedDate({ date, isModalComment }) {
  const getDiff = getTimeDifferences(date);
  const relativeTime = getRelativeTime(getDiff);
  const formattedDate = getFormattedDate(date);

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

const StyledFormatedDate = styled.div`
  & a {
    font-size: var(--font-size-small);
    color: var(--color-gray-text);
    letter-spacing: 0.2px;

    ${(props) =>
      props.isModalComment &&
      css`
        font-size: var(--font-size-tiny) !important;
      `}
  }
`;

export const StyledTooltip = styled(Tooltip)`
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
