import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api/quiz",
});

export const saveScore = (user, totalScore) =>
  API.post("/score", { user, totalScore });

export const getQuestions = () => API.get("/question");