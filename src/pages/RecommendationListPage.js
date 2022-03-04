import { useState, useEffect } from "react";
import axios from "axios";

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
    .then((response) => setRecommendations(response.data))
    .catch((error) => console.log(error));
};

  // get all recommendations once
  useEffect(() => {
    getAllRecommendations();
    // console.log();
  }, [] );

  
  return (
    <div className="RecommendationListPage">
      
      <AddRecommendation refreshRecommendations={getAllRecommendations} />
      
      { recommendations.map((recommendation) => <RecommendationCard key={recommendation._id} {...recommendation} />  )} 
       
    </div>
  );
}

export default RecommendationListPage;

