import axios from "axios";

const instance = axios.create({
  withXSRFToken: true,
  xsrfCookieName: "CSRF-TOKEN",
  xsrfHeaderName: "X-CSRF-Token",
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
export default instance;
