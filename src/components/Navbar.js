import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../Navbar.css";
import NavbarOption from "./NavbarOption";
import {
  HomeRounded,
  Favorite,
  Search,
  Notification,
  MailOption,
  Bookmark,
} from "grommet-icons";
import { Button } from "@material-ui/core";
import Avatar from "react-avatar";
import VerifiedIcon from "@mui/icons-material/Verified";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h3 style={{ fontFamily: "Sans Serif" }}>AMIGO</h3>

      {/*    UPDATE     */}
      {isLoggedIn && (
        <>
          {/* <Link to="/recommendations" className="link">
            <NavbarOption text="Browse" />
          </Link> */}
          <div>
            <div className="post_avatar">
              <Avatar
                size={50}
                color={"grey"}
                name="Wim Mostmans"
                round={true}
              />
              <div className="post_headerText">
                <h3>
                  {user && user.name}{" "}
                  <span className="post_headerSpecial">
                    <VerifiedIcon className="post_badge" />
                  </span>
                </h3>
              </div>
            </div>
          </div>
          {/* <span>Hi {user && user.name}</span> */}

          <Link to="/recommendations" className="link">
            <NavbarOption
              active
              icon={<HomeRounded size="15px" />}
              text="Home"
            />
          </Link>

          <Link to="/recommendations" className="link">
            <NavbarOption icon={<Favorite size="15px" />} text="Likes" />
          </Link>

          <NavbarOption icon={<Search size="15px" />} text="Explore" />
          <NavbarOption
            icon={<Notification size="15px" />}
            text="Notifications"
          />
          <NavbarOption icon={<MailOption size="15px" />} text="Messages" />
          <NavbarOption icon={<Bookmark size="15px" />} text="Bookmarks" />

          <Button variant="outlined" className="sidebar_logout" fullWidth onClick={logOutUser}>
            Logout
          </Button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup" className="link">
            <NavbarOption text="Sign Up" />
          </Link>
          <Link to="/login" className="link">
            <NavbarOption text="Login" />
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
