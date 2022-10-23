import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
