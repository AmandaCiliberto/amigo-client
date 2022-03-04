import { Link } from "react-router-dom";
import uploadImage from "../api/uploadImage";

// We are deconstructing props object directly in the parentheses of the function
function RecommendationCard({
  userId,
  content,
  imageUrl,
  location,
  _id
}) 

{
console.log('props', userId, content, imageUrl, location, _id);

  return (
    <div className="RecommendationCard card">
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
  );
}

export default RecommendationCard;