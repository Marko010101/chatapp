import styled from "styled-components";
import { PiDotsThreeBold } from "react-icons/pi";

import Heading from "../../ui/Heading.jsx";
import { useComments } from "./useComment.js";
import Comments from "./Comments.jsx";

const StyledPost = styled.ul`
  margin-top: 2rem;
`;

const PostContainer = styled.li`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem 58rem 15rem;
  row-gap: 0.5rem;
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: transparent;
  background: linear-gradient(var(--color-pink-logo), var(--color-blue-logo));

  img {
    display: block;
    width: 3.6rem;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
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

const Coments = styled.div``;

const PostFooter = styled.div``;

function Post({ post }) {
  const { id, image, likes, owner, publishDate, tags, text } = post;

  const {
    firstName: ownerFirstName,
    id: ownerId,
    lastName: ownerLastName,
    picture: ownerPicture,
    title: ownerTitle,
  } = owner;

  const fullName = `${ownerFirstName} ${ownerLastName}`;

  const { comments, isError } = useComments(id);

  /*   if (comments && comments.data.length > 0) {
    // Map through each comment and return the desired properties
    return comments.data.map((comment) => {
      const { id, message, owner, post, publishDate } = comment;
      return { id, message, owner, post, publishDate };
    });
  } */

  return (
    <StyledPost>
      <PostContainer>
        <HeaderPost>
          <ImageWrapper>
            <img
              src={ownerPicture || "../../../public/default-user.jpg"}
              alt="Owner image"
            />
          </ImageWrapper>
          <Heading as="h4">{fullName}</Heading>
          <p>{publishDate}</p>
          <span>
            <PiDotsThreeBold />
          </span>
        </HeaderPost>
        <PostImg>
          <img src={image} alt="Post image" />
        </PostImg>
        <PostFooter>
          <span>{likes} likes</span>
          <p>{text}</p>
          <Comments postId={id} />
        </PostFooter>
      </PostContainer>
    </StyledPost>
  );
}

export default Post;
