import axios from "axios";

const request = axios.create({
  baseURL: "https://637303190bb6b698b60025ae.mockapi.io/api_lastets/",
});

export default request;
