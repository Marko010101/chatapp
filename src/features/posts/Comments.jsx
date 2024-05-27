import { useComments } from "./useComment.js";

function Comments({ postId }) {
  const { comments, isError } = useComments(postId);

  console.log(comments);
  return (
    <div>
      {comments && comments.data.length > 0 ? (
        <div>
          {comments.data.map((comment) => (
            <div key={comment.id}>
              {/* Render each comment */}
              <p>{comment.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No comments available</p>
      )}
    </div>
  );
}

export default Comments;
