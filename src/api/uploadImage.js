// src/api/service.js

import axios from "axios";

const api = axios.create({
  // make sure you use PORT = 5005 (the port where our server is running)
  baseURL: "http://localhost:5005/api",
  // withCredentials: true // => you might need this option if using cookies and sessions
});

const errorHandler = (err) => {
  throw err;
};

const storedToken = localStorage.getItem("authToken");

const uploadImage = (file) => {
  return api
    .post("/upload", file, 
    //verify token
    { headers: { Authorization: `Bearer ${storedToken}` } })
    .then((res) => {
      return res.data
    })
    .catch(errorHandler);
};

export default uploadImage;
