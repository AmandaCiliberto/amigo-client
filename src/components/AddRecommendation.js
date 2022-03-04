import { useState, useContext } from "react";
/* import { useParams } from "react-router-dom"; */
import axios from "axios";
import { AuthContext } from "../context/auth.context";
// import uploadImage from "../api/uploadImage";

const API_URL = "http://0.0.0.0:5005";

function AddRecommendation(props) {
  const { user } = useContext(AuthContext);

  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");

  // ******** this method submits the form  ********
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = { content, imageUrl, location };
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

  // ********  this method handles the file upload ********
  // const handleFileChange = (e) => {
  //   const img = {
  //     preview: URL.createObjectURL(e.target.files[0]),
  //     data: e.target.files[0],
  //   };
  //   setImageUrl(img);
  // };

  return (
    <div className="AddRecommendation">
      <h3>Add Recommendation</h3>

      <form onSubmit={handleSubmit} /* encType="multipart/form-data" */>
        <label>Content</label>
        <input
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* <label>Location</label>
        <input
          type="text"
          name="location"
          value={location}
          onChange={(e) => setContent(e.target.value)}
        /> */}

        {/* <label>Image:</label>
        <input type="file" onChange={(e) => handleFileChange(e)} /> */}

        <button type="submit">Recommend</button>
      </form>
    </div>
  );
}

export default AddRecommendation;
