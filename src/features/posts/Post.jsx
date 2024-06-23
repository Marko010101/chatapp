import styled from "styled-components";
import { PiDotsThreeBold } from "react-icons/pi";
import { Tooltip } from "react-tooltip";

import Heading from "../../ui/Heading.jsx";
import { getFormattedDateInfo } from "../../utils/helpers.js";
import PostInfo from "./PostInfo.jsx";

const StyledPost = styled.ul`
  margin-top: 2rem;
`;

const PostContainer = styled.li`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem 58rem max-content;
  row-gap: 0.5rem;
`;

const OwnerImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: transparent;
  background: linear-gradient(var(--color-pink-logo), var(--color-blue-logo));

  img {
    width: 3.6rem;
    border: 0.2rem solid var(--color-black);
  }
`;

const HeaderPost = styled.header`
  display: grid;
  grid-template-columns: repeat(2, max-content) 1fr max-content;
  align-items: center;
  column-gap: 2rem;

  & p {
  }

  & span {
    width: 2.5rem;
    height: 2.5rem;

    & > svg {
      width: 100%;
      height: 100%;
    }
  }
`;
const PostImg = styled.div`
  width: 100%;
  max-width: 46rem;
  overflow: hidden;

  & img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: var(--border-radius-tiny);
  }
`;
const Date = styled.div``;

const StyledTooltip = styled(Tooltip)`
  font-size: var(--font-size-tiny) !important;
  padding: 1rem !important;
  border-radius: var(--border-radius-tiny) !important;
  border-top: 1px solid var(--color-gray-100) !important;
  border-left: 1px solid var(--color-gray-100) !important;

  &.__react_component_tooltip {
    padding: 0 !important;
  }

  .__react_component_tooltip div {
    padding: 0 !important;
  }
`;

function Post({ post }) {
  const { id, image, likes, owner, publishDate, tags, text } = post;

  const {
    firstName: ownerFirstName,
    id: ownerId,
    lastName: ownerLastName,
    picture: ownerPicture,
    title: ownerTitle,
  } = owner;

  const { relativeTime, formattedDate } = getFormattedDateInfo(publishDate);

  const fullName = `${ownerFirstName} ${ownerLastName}`;

  return (
    <StyledPost>
      <PostContainer>
        <HeaderPost>
          <OwnerImageWrapper>
            <img
              className="image-user"
              src={ownerPicture || "../../../public/default-user.jpg"}
              alt="Owner image"
            />
          </OwnerImageWrapper>
          <Heading as="h4">{fullName}</Heading>
          <div>
            <a
              data-tooltip-id="formatedDate"
              data-tooltip-content={formattedDate}
            >
              {relativeTime}
            </a>
            <StyledTooltip
              id="formatedDate"
              place="top"
              effect="solid"
              delayShow={400}
            />
          </div>
          <span>
            <PiDotsThreeBold />
          </span>
        </HeaderPost>
        <PostImg>
          <img src={image} alt="Post image" />
        </PostImg>
        <PostInfo likes={likes} text={text} id={id} />
      </PostContainer>
    </StyledPost>
  );
}

export default Post;
