function ModalPost({ commentsData, postId }) {
  return (
    <div>
      {commentsData.map((comment) => (
        <div key={comment.id}>
          {postId === comment.post && (
            <p>
              {comment.message} {comment.owner.firstName}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ModalPost;
