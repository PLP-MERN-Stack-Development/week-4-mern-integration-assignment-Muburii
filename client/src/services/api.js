import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api"
});

// Automatically add auth token if available
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Post-related API functions
export const postService = {
  getAll: () => API.get("/posts").then(res => res.data),
  getAllPosts: () => API.get("/posts").then(res => res.data), // Alternative method name
  getPost: (id) => API.get(`/posts/${id}`).then(res => res.data),
  create: (data) => API.post("/posts", data).then(res => res.data),
  createPost: (data) => API.post("/posts", data).then(res => res.data), // Alternative method name
  update: (id, data) => API.put(`/posts/${id}`, data).then(res => res.data),
  updatePost: (id, data) => API.put(`/posts/${id}`, data).then(res => res.data), // Alternative method name
  remove: (id) => API.delete(`/posts/${id}`).then(res => res.data),
  deletePost: (id) => API.delete(`/posts/${id}`).then(res => res.data), // Alternative method name
};

// Category-related API functions
export const categoryService = {
  getAll: () => API.get("/categories").then(res => res.data),
  getAllCategories: () => API.get("/categories").then(res => res.data), // Alternative method name
  getCategory: (id) => API.get(`/categories/${id}`).then(res => res.data),
  create: (data) => API.post("/categories", data).then(res => res.data),
  createCategory: (data) => API.post("/categories", data).then(res => res.data), // Alternative method name
  update: (id, data) => API.put(`/categories/${id}`, data).then(res => res.data),
  updateCategory: (id, data) => API.put(`/categories/${id}`, data).then(res => res.data), // Alternative method name
  remove: (id) => API.delete(`/categories/${id}`).then(res => res.data),
  deleteCategory: (id) => API.delete(`/categories/${id}`).then(res => res.data), // Alternative method name
};

// Authentication API functions
export const authService = {
  signup: (data) => API.post("/auth/signup", data).then(res => res.data),
  login: (data) => API.post("/auth/login", data).then(res => res.data),
};

export default API;