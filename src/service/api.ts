import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.25.132:3333",
});

api.interceptors.response.use(
  (response) => {
    console.log("INTERCEPTOR RESPONSE =>", response);
    return response;
  },
  (error) => {
    console.log("INTERCEPTOR RESPONSE ERROR =>", error);
    return Promise.reject(error);
  }
);
