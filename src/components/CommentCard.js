// We are deconstructing the props object directly in the parentheses of the function
function CommentCard({ userId, content, date }) {
  return (
    <div className="CommentCard card">
      <h3>{userId}</h3>
      <h4>Comment:</h4>
      <p>{content}</p>
      <p>{date}</p>
    </div>
  );
}

export default CommentCard;

