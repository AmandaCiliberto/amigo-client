import HomePageNav from "../pages/HomePageNav";

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
          <div>
            <img
              src="../images/friends.jpg"
              alt="friends"
              className="left-panel-img"
            />
          </div>
          <div>
            <h2>hy</h2>
          </div>
        </div>

        <div className="right-panel">
          <h2>hi</h2>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
