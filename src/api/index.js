import axios from 'axios';

const serviceApi = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

export default serviceApi;
