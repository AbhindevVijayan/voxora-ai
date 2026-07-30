import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

export const getVoices = () => api.get("/voices/");

export const generateVoice = (data) =>
    api.post("/generate/", data);

export const getHistory = () =>
    api.get("/history/");

export const deleteHistory = (id) =>
    api.delete(`/history/${id}/`);

export default api;