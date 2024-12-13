// axiosInstance.js
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Replace with your API base URL
  //   timeout: 10000, // Timeout in milliseconds
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add an authorization token if available
    const token = localStorage.getItem("authToken"); // Adjust storage mechanism as needed
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Customize headers or other configurations if needed
    config.headers["Content-Type"] = "application/json";

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => {
    // Handle request error
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Process and return response data
    return response.data;
  },
  (error) => {
    // Handle response errors (e.g., log out on 401, show messages on 500)
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Response error:", error.response);
      if (error.response.status === 401) {
        // Redirect to login or handle unauthorized access
        console.warn("Unauthorized, logging out...");
        localStorage.removeItem("authToken");
        window.location.href = "/login"; // Replace with your login route
      }
    } else if (error.request) {
      // No response received
      console.error("No response received:", error.request);
    } else {
      // Error setting up the request
      console.error("Error in request setup:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
