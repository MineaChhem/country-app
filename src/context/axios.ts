import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        // Add other headers as needed, e.g., authorization: `Bearer ${token}`
    }
});

export default apiClient;