import HomePageNav from "../pages/HomePageNav";
import { Box, WorldMap } from "grommet";
import { Github, Reactjs, Node } from "grommet-icons";

function HomePage() {
  return (
    <div className="container">
      <div className="section-one">
        <img
          src="../images/recoGroup.png"
          alt="chat bubbles"
          style={{ width: "110%" }}
        />
      </div>

      <div className="navbar">
        <div>
          <img src="../images/logo.png" alt="logo" className="logo" />
        </div>

        <div className="first-text">
          Get the best{" "}
          <b style={{ color: "var(--amigo-color)" }}>recommendations</b> from
          your friends now!
        </div>

        <div className="second-text">
          Got friends with good taste? Follow their recommendations for things
          to do and places to go! Join our community now!
        </div>

        <HomePageNav />
      </div>

      <div className="section-two">
        <div className="left-panel">
          <img
            src="../images/shapes.png"
            alt="friends"
            className="left-panel-img"
          />
        </div>
        <div className="right-panel">
          <h2>Are you looking for NEW EXPERIENCES?</h2>
          <p>
            Try AMIGO, get recommendations from your friends. It could be
            products, experiences, adventures, or even a new shop in town.
          </p>
        </div>
      </div>

      <div className="section-three">
        <div className="right-panel">
          <h2>Global Reference</h2>
          <p>
            Know someone who travelled to Italy? They might recommend a
            restaurant you should try out next time you visit the country. Only
            the sky is the limit, for now.
          </p>
        </div>

        <div className="left-panel">
          <Box fill="vertical" overflow="auto" align="center" flex="grow">
            <WorldMap
              color="accent-1"
              hoverColor="control"
              margin="large"
            />
          </Box>
        </div>
      </div>

      <div className="footer">
        <div className="links">
          <h5> ® Developed by Amanda Rodrigues</h5>
        </div>
        <div className="links">
          <Reactjs color="#00D8FF" />
          <Node style={{ paddingLeft: 10 }} color="#689F63" />
        </div>

        <div className="links">
          <Github />
          <h5>
            <a
              href="https://github.com/AmandaCiliberto/amigo-client"
              target="_blank"
              rel="noreferrer"
              aria-label="Github"
              style={{ color: "white", textDecoration: "none" }}
            >
              Github Client
            </a>
          </h5>
          <Github style={{ marginLeft: 20 }} />
          <h5>
            <a
              href="https://github.com/AmandaCiliberto/amigo-server"
              target="_blank"
              rel="noreferrer"
              aria-label="Github"
              style={{ color: "white", textDecoration: "none" }}
            >
              Github Server
            </a>
          </h5>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
