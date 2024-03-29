import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { Chat, Location } from "grommet-icons";
import VerifiedIcon from "@mui/icons-material/Verified";

// We are deconstructing props object directly in the parentheses of the function
function RecommendationCard({
  userId,
  content,
  imageUrl,
  location,
  _id,
  comments,
}) {
  return (
    <div className="post">
      <div className="post_avatar">
        <Avatar size={50} color={"grey"} name="Wim Mostmans" round={true} />
      </div>

      <Link
        to={`/recommendations/${_id}`}
        style={{ textDecoration: "none", color: "rgb(46, 46, 46)" }}
      >
        <div className="post_body">
          <div className="post_header">
            <div className="post_headerText">
              <h3>
                {userId.name}
                <span className="post_headerSpecial">
                  <VerifiedIcon className="post_badge" />
                </span>
              </h3>
            </div>
            <div className="post_headerDescription">
              <p>{content} </p>
            </div>
            <div className="post_location">
              <p>
                <Location size="20px" />
                {location}
              </p>
              <button className="recommend">#recommended</button>
            </div>
          </div>
          <img
            onError={(event) => (event.target.src = " ")}
            src={imageUrl}
            alt=""
          />

          <div className="post_footer">
            <div style={{ alignItems: "center" }}>
              <Chat color="plain" size="20px" />
              <span style={{ marginLeft: 10 }}>{comments.length} Comments</span>
            </div>

            <div className="heart"></div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RecommendationCard;
