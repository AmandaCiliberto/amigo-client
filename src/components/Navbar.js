import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../css/Navbar.css";
import NavbarOption from "./NavbarOption";
import {
  HomeRounded,
  Favorite,
  Search,
  Notification,
  MailOption,
  Bookmark
} from "grommet-icons";
import { Button } from "@material-ui/core";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Avatar, Box } from 'grommet';

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="sidebar">
      <h3 className="sidebar_logo">AMIGO</h3>

      {/*    UPDATE     */}
      {isLoggedIn && (
        <>
          {/* <Link to="/recommendations" className="link">
            <NavbarOption text="Browse" />
          </Link> */}
          <div>
            <div className="post_avatar">
              <Box direction="row" gap="small">
                <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
              </Box>
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

          <Link to="/recommendations" style={{ textDecoration: "none" }}>
            <NavbarOption
              active
              icon={<HomeRounded color="#9e79f5" size="15px" />}
              text="Home"
            />
          </Link>

          <Link to="/recommendations" style={{ textDecoration: "none" }}>
            <NavbarOption icon={<Favorite size="15px" />} text="Likes" />
          </Link>

          <NavbarOption icon={<Search size="15px" />} text="Explore" />
          <NavbarOption
            icon={<Notification size="15px" />}
            text="Notifications"
          />
          <NavbarOption icon={<MailOption size="15px" />} text="Messages" />
          <NavbarOption icon={<Bookmark size="15px" />} text="Bookmarks" />

          <Button
            variant="outlined"
            className="sidebar_button"
            fullWidth
            onClick={logOutUser}
          >
            Logout
          </Button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Button className="sidebar_button">
            <Link to="/signup" className="link">
              <NavbarOption text="Sign Up" />
            </Link>
          </Button>

          <Button className="sidebar_button">
            <Link to="/login" className="link">
              <NavbarOption text="Login" />
            </Link>
          </Button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
