import { Link } from "react-router-dom";
import Avatar from "react-avatar";
import { Chat, Favorite } from "grommet-icons";
import VerifiedIcon from "@mui/icons-material/Verified";

// We are deconstructing props object directly in the parentheses of the function
function UserCard({ userId, content, imageUrl, location, _id }) {
  console.log("user id", userId);

  //  findByIdandUpdate

  return (
    <div className="post card">
      <div className="post_avatar">
        <Avatar size={50} color={"grey"} name="Wim Mostmans" round={true} />
      </div>

      {/* add a route to get user profile by user Id */}
      {/* save and show list of all users  */}
      <Link
        to={`/recommendations/${_id}`}
        style={{ textDecoration: "none", color: "rgb(46, 46, 46)" }}
      >
        <div className="post_body">
          <div className="post_header">
            <div className="post_headerText">
              <h3>
                {userId}
                <span className="post_headerSpecial">
                  <VerifiedIcon className="post_badge" />
                </span>
              </h3>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default UserCard;
