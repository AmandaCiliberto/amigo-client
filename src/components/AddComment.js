import { useState } from "react";
import axios from "axios";
import { Avatar } from "grommet";
import '../css/Comments.css';

const API_URL = "http://0.0.0.0:5005";


function AddComment(props) {
  console.log('creator props addComment', props.creator)
  
    const [content, setContent] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // We need the recommendation id when creating the new comment
    const { recommendation } = props;
    const { creator } = props;
    const requestBody = { creator, content, recommendation };
    console.log('req body inside addComment', requestBody)
    const storedToken = localStorage.getItem('authToken');

    axios
      .post(`${API_URL}/api/comments`, requestBody,{ headers: { Authorization: `Bearer ${storedToken}` } })
      .then((response) => {
        // Reset the state to clear the inputs
        setContent("");
        // Invoke the callback function coming through the props
        // from the RecommendationDetailsPage, to refresh the recommendation details
        props.refreshRecommendations();
      })
      .catch((error) => console.log(error));
  };

  
  return (
    <div className="comment_box">
      <form onSubmit={handleSubmit}>
        <div className="add-comment">
          <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
          <input
            className="comment-input"
            placeholder="Add your reply"
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className="reply-btn" type="submit">
            Comment
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddComment;