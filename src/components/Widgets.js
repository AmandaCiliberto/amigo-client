import React from "react";
import "../css/Widgets.css";
import UserCard from "./UserCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { TwitterTimelineEmbed, TwitterShareButton, TwitterTweetEmbed } from "react-twitter-embed";

const API_URL = "https://amigo-application.herokuapp.com";


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
  }, []);

  return (
    <div className="widgets">
      {/* <div className="widgets_input">
        <SearchIcon className="widgets_searchIcon" />
        <input placeholder="Find Friends" type="text" />
      </div> */}
      <div className="widget_header">
        <h2>What's Happening</h2>
      </div>
      <div className="widgets_widgetContainer">
        <h2>My Friends</h2>
        {recommendations.map((recommendation) => (
          <UserCard key={recommendation._id} {...recommendation} />
        ))}
        <TwitterTweetEmbed tweetId={"1500478225742536717"} />

        <TwitterTimelineEmbed 
        sourceType="profile"
        screenName="cilibertoamanda"
        options={{ height: 400 }}
        />

        <TwitterShareButton 
        url={'https://facebook.com/amandacmr'}
        options={{ text: "#amigoapp is awesome! You shoul try it!", via: "cilibertoamanda" }}
        />

      </div>
    </div>
  );
}

export default Widgets;
