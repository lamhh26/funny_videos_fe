import axios from "axios";

const instance = axios.create({
  withXSRFToken: true,
  xsrfCookieName: "CSRF-TOKEN",
  xsrfHeaderName: "X-CSRF-Token",
  withCredentials: true,
  baseURL: "http://localhost:3000",
});
export default instance;
