import axios from "axios";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "X-Authorization": process.env.COMMERCEJS_SK_TEST,
  },
  baseURL: "https://api.chec.io/v1",
});

export default api;
