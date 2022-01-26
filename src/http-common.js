import axios from "axios";

// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

export default axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-type": "application/json",
  }
});
