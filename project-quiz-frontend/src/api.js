import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/quiz",
});

// Send fields exactly as backend expects
export const saveScore = (user, totalScore) =>
  API.post("/score", { user, totalScore });
