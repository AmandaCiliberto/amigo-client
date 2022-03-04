import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import AddComment from "../components/AddComment";
import CommentCard from "../components/CommentCard";


const API_URL = "http://0.0.0.0:5005";


function RecommendationDetailsPage (props) {
  const [recommendation, setRecommendation] = useState(null);
  const { id } = useParams();
  
  //function to get recommendation and verify token
  const getRecommendation = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    // Send the token through the request "Authorization" Headers
    axios
      .get(
        `${API_URL}/api/recommendations/${id}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneRecommendation = response.data;
        setRecommendation(oneRecommendation);
      })
      .catch((error) => console.log(error));
  };
  
  //use effect to run the function once
  useEffect(()=> {
    getRecommendation();
  }, [] );

  
  return (
    <div className="RecommendationDetails">
      {recommendation && (
        <>
          <p>{recommendation.content} </p>
          <p>{recommendation.location} </p>
          {/* <img src={imageUrl} /> */}
        </>
      )}

      <AddComment
        refreshRecommendations={getRecommendation}
        recommendationId={id}
      />

      {recommendation &&
        recommendation.comments.map((comment) => (
          <CommentCard key={comment._id} {...comment} />
        ))}

      <Link to="/recommendations">
        <button>Back to browse recommendations</button>
      </Link>

      <Link to={`/recommendations/edit/${id}`}>
        <button>Edit this recommendation</button>
      </Link>
    </div>
  );
}

export default RecommendationDetailsPage;