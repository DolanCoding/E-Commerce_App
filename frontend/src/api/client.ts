import axios from "axios";
import type { AxiosInstance } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Debug logging
console.log("🔧 API Configuration:");
console.log(`  API URL: ${API_BASE_URL}`);
console.log(`  Environment: ${import.meta.env.MODE}`);
console.log(`  VITE_API_URL env: ${import.meta.env.VITE_API_URL || "not set"}`);

const client: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    if (token) {
      console.log(`   ✓ Authorization token attached`);
    }

    return config;
  },
  (error) => {
    console.error(`❌ Request Error:`, error);
    return Promise.reject(error);
  }
);

// Handle response errors
client.interceptors.response.use(
  (response) => {
    console.log(`✅ Response Success: ${response.status} ${response.statusText}`);
    console.log(`   Data:`, response.data);
    return response;
  },
  (error) => {
    console.error(`❌ API Error:`, {
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      url: error.config?.url,
      data: error.response?.data,
    });

    if (error.response?.status === 401) {
      console.warn(`⚠️  Unauthorized (401). Clearing token and redirecting to login.`);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    if (error.message === "Network Error" || !error.response) {
      console.error(`🔴 Network Connection Failed - Cannot reach API at: ${API_BASE_URL}`);
      console.error(`   Check if backend is running and API_URL is correct.`);
    }

    return Promise.reject(error);
  }
);

// Test connection on load
export async function testConnection() {
  try {
    const healthUrl = API_BASE_URL.replace("/api", "") + "/health";
    console.log(`🧪 Testing connection to ${healthUrl}`);
    const response = await axios.get(healthUrl);
    console.log(`✅ Health check passed:`, response.data);
    return true;
  } catch (error) {
    console.error(`❌ Health check failed - Server may not be running`);
    return false;
  }
}

export default client;
