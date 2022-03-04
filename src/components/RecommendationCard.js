import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Avatar from "react-avatar";


// We are deconstructing props object directly in the parentheses of the function
function RecommendationCard({ userId, content, imageUrl, location, _id }) {
  console.log("user id", userId);

  //  findByIdandUpdate

  return (
    <div className="RecommendationCard card">
      <div className="post_avatar">
        <Avatar
          size={70}
          color={Avatar.getRandomColor("sitebase", ["red", "green", "blue"])}
          name="Wim Mostmans"
          round={true}
        />
      </div>

      <div className="post_body">
        <div className="post_header">
          <div className="post_headerText">
            <h3>
             {userId} 
            </h3>
          </div>
        </div>
        <p style={{ maxWidth: "700px" }}>{content} </p>
      <p style={{ maxWidth: "200px" }}>{location} </p>
      <Link to={`/recommendations/${_id}`}>
        <h3>See Details</h3>
      </Link>
      <img
        src={imageUrl}
        style={{ maxWidth: "400px" }}
        alt="recommendation img"
      />
      </div>
      
    </div>
  );
}

export default RecommendationCard;
