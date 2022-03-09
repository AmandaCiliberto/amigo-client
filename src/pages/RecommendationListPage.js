import { useState, useEffect } from "react";
import axios from "axios";
import '../css/Feed.css'

import RecommendationCard from "./../components/RecommendationCard";
import AddRecommendation from "../components/AddRecommendation";

const API_URL = "https://amigo-application.herokuapp.com";

function RecommendationListPage() {
  const [recommendations, setRecommendations] = useState([]);

  const getAllRecommendations = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
    .get(
    `${API_URL}/api/recommendations`,
    //verify token
    { headers: { Authorization: `Bearer ${storedToken}` } }
  )
    .then((response) => {
      response.data.sort(function (x, y) {
        return new Date(y.createdAt) - new Date(x.createdAt);
      });

      setRecommendations(response.data)
    })
    .catch((error) => console.log(error));
};

  // get all recommendations once
  useEffect(() => {
    getAllRecommendations();
  }, [] );

  return (
    <div className="feed">
      {/* header */}
      <div className="feed_header">
        <h2>Home</h2>
      </div>

      {/* postBox */}
      <AddRecommendation refreshRecommendations={getAllRecommendations} />

      {recommendations.map((recommendation) => (
        <RecommendationCard key={recommendation._id} {...recommendation} comments={recommendation.comments} likes={recommendation.likes} />
      ))}

    </div>
  );
}

export default RecommendationListPage;

