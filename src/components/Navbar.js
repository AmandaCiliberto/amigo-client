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

      {isLoggedIn && (
        <>
          <div className="profile-btn">
            <Link to="/profile" className="profile-link">
              <div className="post_avatar">
                <Box direction="row" gap="small">
                  <Avatar src="https://images.unsplash.com/flagged/photo-1557786458-77474e6ff1bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" />
                </Box>
                <div className="post_headerText">
                  <h3>
                    {user && user.name}
                    <span className="post_headerSpecial">
                      <VerifiedIcon className="post_badge" />
                    </span>
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          <Link to="/recommendations" style={{ textDecoration: "none" }}>
            <NavbarOption
              active
              icon={<HomeRounded color="#9e79f5" size="15px" />}
              text="Feed"
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
