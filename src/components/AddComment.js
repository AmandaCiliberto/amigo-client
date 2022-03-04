import { useState } from "react";
import axios from "axios";

const API_URL = "http://0.0.0.0:5005";


function AddComment(props) {
  console.log(props)
  const [content, setContent] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // We need the recommendation id when creating the new comment
    const { recommendationId } = props;
    // Create an object representing the body of the POST request
    const requestBody = { /* date, userId, */ content, recommendationId };
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
    <div className="AddComment">
      <h3>Write a comment</h3>
      
      <form onSubmit={handleSubmit}>
        {/* <img 
        src=""        
        /> */}
        <textarea
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">Comment</button>
      </form>
    </div>
  );
}

export default AddComment;