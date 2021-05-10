import axios from "axios";

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    "X-Authorization": "sk_test_253819e270b95cdf86db638032063655b85138227deab", //process.env.COMMERCEJS_SK_TEST,
  },
  baseURL: "https://api.chec.io/v1",
});

export default api;
