import axios from "axios";

export const httpClient = axios.create({
  baseURL: "https://localhost:7081/api", // Aquí solo ponemos /api, el endpoint se concatena después
  headers: {
    "Content-Type": "application/json",
  },
});
