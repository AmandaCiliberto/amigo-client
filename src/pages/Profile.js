import React, { useContext, useState, useEffect } from "react";
import "../css/Profile.css";
import axios from "axios";
import RecommendationCard from "./../components/RecommendationCard";
import { Link } from "react-router-dom";
import { FormPrevious } from "grommet-icons";
import { AuthContext } from "../context/auth.context";

const API_URL = "https://amigo-application.herokuapp.com";

function Profile() {
  const [recommendations, setRecommendations] = useState([]);
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem("authToken");
  console.log("user", user);

  const getAllRecommendations = () => {
    console.log("TOKEN", storedToken);

    axios
      .get(
        `${API_URL}/api/profile/${user._id}`,
        //verify token
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        response.data.myrecommendation.sort(function (x, y) {
          return new Date(y.createdAt) - new Date(x.createdAt);
        });

        setRecommendations(response.data.myrecommendation);
      })
      .catch((error) => console.log(error));
  };

  // get all recommendations once
  useEffect(() => {
    getAllRecommendations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ margin: 20 }}>
      <div>
        <Link to="/recommendations">
          <FormPrevious />
        </Link>
      </div>
      <div>
        {user && (
          <div className="profile-container">
            <div>
              <div style={{ margin: "20px" }}>
                <img
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "80px",
                  }}
                  src="https://images.unsplash.com/flagged/photo-1557786458-77474e6ff1bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt=""
                />
              </div>

              <div className="header-area">
                <div style={{ marginBottom: 20 }}>
                  <h2>{user && user.name}</h2>
                </div>

                <div>
                  <p>
                    <b>{recommendations.length}</b> Recommendations
                  </p>
                </div>
              </div>

              <div className="mypost">
                <div>
                  <h4 style={{ marginBottom: 40 }}>My Recommendations 💜</h4>

                  {!recommendations.length && (
                    <p style={{ margin: 20 }}> No Recommendations</p>
                  )}
                  {recommendations &&
                    recommendations.map((recommendation) => (
                      <RecommendationCard
                        key={recommendation._id}
                        {...recommendation}
                        comments={recommendation.comments}
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
