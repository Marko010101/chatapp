import styled from "styled-components";

import { getFormattedDateInfo } from "../../utils/helpers.js";

const StyledComment = styled.aside``;

function Comment({ comment }) {
  const { message, owner, publishDate } = comment;
  const { firstName, lastName } = owner;

  // Get the formatted date info
  const { relativeTime } = getFormattedDateInfo(publishDate);

  return (
    <StyledComment>
      <div>
        {message}{" "}
        <span>
          {firstName} {lastName}
        </span>
        <span>{relativeTime}</span>
      </div>
    </StyledComment>
  );
}

export default Comment;
