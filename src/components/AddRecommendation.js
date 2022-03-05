import { useState, useContext } from "react";
/* import { useParams } from "react-router-dom"; */
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import uploadImage from "../api/uploadImage";
import "../css/AddRecommendation.css";
import { Box, Avatar } from "grommet";
import { Image , Location} from "grommet-icons";

const API_URL = "http://0.0.0.0:5005";
let loading = false;

function AddRecommendation(props) {
  const { user } = useContext(AuthContext);
  // console.log('user id', userId)
  // const username = userId.name;

  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState("");

  // ******** this method submits the form  ********
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { userId: user._id, content, imageUrl, location };
    console.log("req body", requestBody);
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
        // console.log(response)
        setContent("");
        setImageUrl("");
        setLocation("");
        props.refreshRecommendations();
      })
      .catch((error) => console.log(error));
  };

  //********  this method handles the file upload ********
  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    //check if image is loading
    if (!e.target.files[0]) {
      setLoading(true);
    } else setLoading(false);

    uploadData.append("imageUrl", e.target.files[0]);

    uploadImage(uploadData)
      .then((response) => {
        setImageUrl(response.imageUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  return (
    <div className="addPost">
      <form onSubmit={handleSubmit} /* encType="multipart/form-data" */>
        <div className="addPost_input">
          <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
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
          alt=''
        />

        <div className="post_icons">
          <label
            htmlFor="file-upload"
            style={{
              cursor: "pointer",
              display: "flex",
            }}
            className="post_imageInput"
          >
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
            style={{ cursor: "pointer", display: "flex" }}
          />

          <div style={{ display: loading ? "block" : "none" }}>
            Loading Image...
          </div>

          <button type="submit" className="post_btn">
            Recommend
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddRecommendation;
