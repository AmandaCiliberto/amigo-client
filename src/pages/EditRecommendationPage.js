import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://0.0.0.0:5005";

function EditRecommendationPage(props) {
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { id } = useParams();
  /* const { userId } = useParams(); */
  const navigate = useNavigate();

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
    const requestBody = { content, location, imageUrl };
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

  return (
    <div className="EditRecommendationPage">
      <h3>Edit Recommendation</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Content</label>
        <textarea
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label>Location</label>
        <textarea
          type="text"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <label>Image:</label>
        <input
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.files[0])}
        />

        <button type="submit">Save Changes</button>
      </form>

      <button onClick={deleteRecommendation}>Delete Recommendation</button>
    </div>
  );
}

export default EditRecommendationPage;
