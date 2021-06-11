import Vue from "vue";
import axios from "axios";

// API to get data
// Replace the real API here
const url = "https://jsonkeeper.com/b/S3US";

// Axios definition
const instance = axios.create({
  baseURL: url,
  timeout: 30000,
});

instance.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

instance.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    // Show toast with appropriate error message
    Vue.$vToastify.error(
      error.response.statusText,
      "Error" + error.response.status
    );
    return Promise.reject(error);
  }
);

export default instance;
