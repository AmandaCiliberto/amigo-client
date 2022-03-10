// src/api/service.js

import axios from "axios";

const api = axios.create({
  baseURL: "https://amigo-application.herokuapp.com/api",
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
