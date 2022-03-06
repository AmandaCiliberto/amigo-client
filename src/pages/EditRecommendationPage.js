import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { FormPrevious, Trash } from "grommet-icons";
import "../css/editRecommendation.css";
import { AuthContext } from "../context/auth.context";
import uploadImage from "../api/uploadImage";
import { Image } from "grommet-icons";

const API_URL = "http://0.0.0.0:5005";

function EditRecommendationPage(props) {
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { id } = useParams();
  /* const { userId } = useParams(); */
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    //get token
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/recommendations/${id}`, {
        //verify token
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneRecommendation = response.data;
        setContent(oneRecommendation.content);
        setLocation(oneRecommendation.location);
        setImageUrl(oneRecommendation.imageUrl);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { userId: user._id, content, location, imageUrl };
    const storedToken = localStorage.getItem("authToken");

    axios
      .put(`${API_URL}/api/recommendations/${id}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/recommendations/${id}`);
      });
  };

  const deleteRecommendation = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/api/recommendations/${id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        navigate("/recommendations");
      })
      .catch((err) => console.log(err));
  };

  //********  this method handles the file upload ********
  const handleFileUpload = (e) => {
    const uploadData = new FormData();

    uploadData.append("imageUrl", e.target.files[0]);

    uploadImage(uploadData)
      .then((response) => {
        setImageUrl(response.imageUrl);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
  };

  return (
    <div className="feed">
      <>
        <div className="feed_header">
          <Link to={`/recommendations/${id}`}>
            <FormPrevious />
          </Link>

          <button onClick={deleteRecommendation} className="delete_btn">
            <Trash />
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="post card">
            <div className="post_body">
              <div className="post_header">
                <label className="label">Content</label>
                <div>
                  <textarea
                    className="edit_content"
                    type="text"
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <label className="label">Location</label>
                <div>
                  <textarea
                    className="edit_location"
                    type="text"
                    name="location"
                    value={location}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: 20,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <label
                    htmlFor="file-upload"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      marginLeft: 0,
                      width: "auto",
                    }}
                    className="post_imageInput"
                  >
                    <Image />{" "}
                    <span
                      style={{
                        marginLeft: 20,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Change Image:
                    </span>
                  </label>
                </div>

                <div>
                  <img
                    onError={(event) => (event.target.src = "")}
                    className="image_preview"
                    style={{ width: "20px !important", margin: 0 }}
                    src={imageUrl}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="edit_btn">
            Save
          </button>
        </form>
      </>
    </div>
  );
}

export default EditRecommendationPage;
