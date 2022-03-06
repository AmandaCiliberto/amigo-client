import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AddComment from "../components/AddComment";
import CommentCard from "../components/CommentCard";
import Widgets from "../components/Widgets";
import { FormPrevious } from "grommet-icons";
import RecommendationCard from "../components/RecommendationCard";
import "../css/RecommendationDetails.css";

const API_URL = "http://0.0.0.0:5005";

function RecommendationDetailsPage(props) {
  const [recommendation, setRecommendation] = useState(null);
  const { id } = useParams();

  //function to get recommendation and verify token
  const getRecommendation = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");
    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/recommendations/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneRecommendation = response.data;
        setRecommendation(oneRecommendation);
      })
      .catch((error) => console.log(error));
  };

  //use effect to run the function once
  useEffect(() => {
    getRecommendation();
  }, []);

  return (
    <div className="feed">
      {!recommendation && <h2 style={{ margin: 50 }}>Loading...</h2>}
      {recommendation && (
        <>
          <div className="feed_header">

            <Link to="/recommendations">
              <FormPrevious />
            </Link>

            <Link
              to={`/recommendations/edit/${id}`}
              style={{ textDecoration: "none" }}
            >
              <button className="edit_btn">Edit</button>
            </Link>
            
          </div>

          <RecommendationCard
            content={recommendation.content}
            location={recommendation.location}
            userId={recommendation.userId}
            imageUrl={recommendation.imageUrl}
          />

          <AddComment
            refreshRecommendations={getRecommendation}
            recommendationId={id}
          />

          <ul>
            <li>
              {recommendation &&
                recommendation.comments.map((comment) => (
                  <CommentCard key={comment._id} {...comment} />
                ))}
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

export default RecommendationDetailsPage;
