import axios from "axios";

const API = axios.create({ 
    baseURL: "http://localhost:3000/api"
});

API.interceptors.request.use(cfg => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Define your postService using the API instance
export const postService = {
  getAllPosts: async () => {
    const response = await API.get("/posts");
    return response.data;
  },
};

export default API;
