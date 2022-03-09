import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AddComment from "../components/AddComment";
import CommentCard from "../components/CommentCard";
import Avatar from "react-avatar";
import { FormPrevious, Location, Chat } from "grommet-icons";
import VerifiedIcon from "@mui/icons-material/Verified";
import "../css/RecommendationDetails.css";
import { AuthContext } from "../context/auth.context";

const API_URL = "https://amigo-application.herokuapp.com";
// const API_URL = "http://0.0.0.0:5005";

function RecommendationDetailsPage() {
  const [recommendation, setRecommendation] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const creator = user;

  //function to get recommendation and verify token
  const getRecommendation = () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    console.log("token", storedToken);
    // Send the token through the request "Authorization" Headers
    axios
      .get(`${API_URL}/api/recommendations/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneRecommendation = response.data;
        console.log("recommendation thats being refreshed", oneRecommendation);
        
        oneRecommendation.comments.sort(function (x, y) {
          return new Date(y.createdAt) - new Date(x.createdAt);
        });

        setRecommendation(oneRecommendation);
      })
      .catch((error) => console.log(error));
  };

  //use effect to run the function once
  useEffect(() => {
    getRecommendation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              {user.name === recommendation.userId.name && (
                <button className="edit_btn">Edit</button>
              )}
            </Link>
          </div>

          <div className="post ">
            <div className="post_avatar">
              <Avatar
                size={50}
                color={"grey"}
                name="Wim Mostmans"
                round={true}
              />
            </div>
            <div className="post_body">
              <div className="post_header">
                <div className="post_headerText">
                  <h3>
                    {recommendation.userId.name}{" "}
                    <span className="post_headerSpecial">
                      <VerifiedIcon className="post_badge" />
                    </span>
                  </h3>
                </div>
                <div className="post_headerDescription">
                  <p>{recommendation.content} </p>
                </div>
                <div className="post_location">
                  <p>
                    <Location size="20px" />
                    {recommendation.location}
                  </p>
                  <button className="recommend">#recommended</button>
                </div>
              </div>
              <img src={recommendation.imageUrl} alt="recommendation img" />
              <div className="post_footer">
                <div style={{ alignItems: "center" }}>
                  <Chat color="plain" size="20px" />
                  <span style={{ marginLeft: 10 }}>
                    {recommendation.comments.length} Comments
                  </span>
                </div>

                <div className="heart"></div>
              </div>
            </div>
          </div>

          <AddComment
            //refresh recommendations to show new comments
            refreshRecommendations={getRecommendation}
            creator={creator.name}
            recommendation={id}
          />

          {recommendation &&
            recommendation.comments.map((comment) => (
              <CommentCard
                key={comment._id}
                creator={creator.name}
                {...comment}
              />
            ))}
        </>
      )}
    </div>
  );
}

export default RecommendationDetailsPage;
