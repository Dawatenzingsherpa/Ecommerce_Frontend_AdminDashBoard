import axios from "axios";

const APIAuthenticated = axios.create({
  baseURL: "https://project2backend-f2fx.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `${localStorage.getItem("token")}`,
  },
});

export const APIAuthForm = axios.create({
  baseURL: "https://project2backend-f2fx.onrender.com/",
  headers: {
    Accept: "application/json",
    Authorization: `${localStorage.getItem("token")}`,
  },
});

export default APIAuthenticated;
