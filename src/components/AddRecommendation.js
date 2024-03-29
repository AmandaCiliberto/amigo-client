import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import uploadImage from "../api/uploadImage";
import "../css/AddRecommendation.css";
import { Image } from "grommet-icons";
import { Avatar } from "grommet";

const API_URL = "https://amigo-application.herokuapp.com";

function AddRecommendation(props) {
  const { user } = useContext(AuthContext);

  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");

  // ******** this method submits the form  ********
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { userId: user._id, content, imageUrl, location };
    //get token
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(
        `${API_URL}/api/recommendations`,
        requestBody,
        //verify token
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        // Reset the state
        setContent("");
        setImageUrl("");
        setLocation("");
        props.refreshRecommendations();
      })
      .catch((error) => console.log(error));
  };

  //********  this method handles the file upload ********
  const handleFileUpload = (e) => {
    console.log("the file uploaded is: ", e.target.files[0]);
    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    uploadImage(uploadData)
      .then((response) => {
        setImageUrl(response.imageUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  return (
    <div className="addPost">
      <form onSubmit={handleSubmit}>
        <div className="addPost_input">
          <Avatar src="https://images.unsplash.com/flagged/photo-1557786458-77474e6ff1bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" />
          <input
            placeholder="What do you recommend?"
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <img
          onError={(event) => (event.target.src = "")}
          className="image_preview"
          src={imageUrl}
          alt=""
        />

        <div className="post_icons">
          <label htmlFor="file-upload" style={{}} className="post_imageInput">
            <Image />
          </label>
          <input
            placeholder="Choose Image"
            type="file"
            id="file-upload"
            onChange={(e) => handleFileUpload(e)}
            style={{ display: "none" }}
          />

          <input
            className="post_location"
            placeholder="Location..."
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ cursor: "pointer", paddingTop: 10 }}
          />

          <button type="submit" className="post_btn">
            Recommend
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecommendation;
