import { useState, useEffect } from "react";
import axios from "axios";
import Feed from '../css/Feed.css'
import Friends from "../components/Friends";

import RecommendationCard from "./../components/RecommendationCard";
import AddRecommendation from "../components/AddRecommendation";

const API_URL = "http://localhost:5005";

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
    // console.log();
  }, [] );

  return (
    <div>
      
      {/* header */}
      <div className="feed">
        <h2>Home</h2>
      </div>
      


      {/* postbox */}
      <AddRecommendation
        refreshRecommendations={getAllRecommendations}
      />

      {recommendations.map((recommendation) => (
        <RecommendationCard
          key={recommendation._id}
          {...recommendation}
        />
      ))}

      {/* friend list */}
      <Friends />
    </div>
  );
}

export default RecommendationListPage;

