import axios from "axios";

// This creates a base configuration for all our API calls
const api = axios.create({
  baseURL: "http://localhost:8081/api/v1", // Your Spring Boot URL
});

export default api;
