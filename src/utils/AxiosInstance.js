import axios from "axios";

const apiRoot = "https://api.openweathermap.org/data/2.5/forecast?APPID=0a24d823e5f48003c6b67116f14c5541&";
//zip=10001
const instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    console.log(JSON.stringify(config));
    config.url = `${apiRoot}${config.url}`;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;