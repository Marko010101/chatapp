function ModalPost({ commentsData, postId }) {
  console.log(commentsData);

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
