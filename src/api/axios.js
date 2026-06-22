import axios from "axios";

const api = axios.create({
baseURL: "https://pr-esports-gameon.onrender.com/api",
});

export default api;
