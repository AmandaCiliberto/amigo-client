import "../css/Comments.css";
import { Avatar } from "grommet";

//card to structure each comment
function CommentCard({ creator, content, date }) {
  
  return (
    <div className="comment_box">
      <div className="comment_header">
        <div>
          <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
        </div>
        <div className="username">
          <h3>{creator}</h3>
        </div>
        <div>
          <p>{date}</p>
        </div>
      </div>

      <div className="comment_body">
        <p>{content}</p>
      </div>
    </div>
  );
}

export default CommentCard;
