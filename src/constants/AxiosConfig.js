import axios from "axios";
// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "http://3.6.187.166:81",
  headers: {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export default instance;
