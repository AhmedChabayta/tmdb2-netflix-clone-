import axios from "axios";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;
