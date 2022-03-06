import React from "react";
import "../css/Widgets.css";
import UserCard from "./UserCard";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import axios from "axios";
import RecommendationCard from "./../components/RecommendationCard";
import AddRecommendation from "../components/AddRecommendation";

const API_URL = "http://localhost:5005";

function Widgets() {
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

        setRecommendations(response.data);
      })
      .catch((error) => console.log(error));
  };

  // get all recommendations once
  useEffect(() => {
    getAllRecommendations();
    // console.log();
  }, []);

  return (
    <div className="widgets">
      <div className="widgets_input">
        <SearchIcon className="widgets_searchIcon" />
        <input placeholder="Find Friends" type="text" />
      </div>
      <div className="widgets_widgetContainer">
        {recommendations.map((recommendation) => (
          <UserCard key={recommendation._id} {...recommendation} />
        ))}
      </div>
    </div>
  );
}

export default Widgets;
