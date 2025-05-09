import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:3001/my-shop-api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;