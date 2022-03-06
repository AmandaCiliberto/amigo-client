import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AddComment from "../components/AddComment";
import CommentCard from "../components/CommentCard";
import Avatar from "react-avatar";
import Widgets from "../components/Widgets";
import { FormPrevious, Location, Chat, Favorite } from "grommet-icons";
import VerifiedIcon from "@mui/icons-material/Verified";
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
                    {recommendation.userId}{" "}
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
                <Chat color="plain" size="20px" />
                <Favorite color="plain" size="20px" />
              </div>
            </div>
          </div>
          {/* <RecommendationCard
            content={recommendation.content}
            location={recommendation.location}
            userId={recommendation.userId}
            imageUrl={recommendation.imageUrl}
          /> */}

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
