import axios from "axios";

// Create an Axios instance with default settings
const api = axios.create({
  // This is the address of your Spring Boot backend
  baseURL: "http://localhost:8081/api/v1",

  // Optional: Set a timeout so requests don't hang forever (e.g., 10 seconds)
  timeout: 10000,

  // Optional: Set headers common to all requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
