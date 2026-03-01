import axios from 'axios';

const appAxios = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Send cookies with requests if handling auth sessions
});

// Optional: Request Interceptor
appAxios.interceptors.request.use(
    (config) => {
        // Modify request config here (e.g., attach auth tokens)
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Optional: Response Interceptor
appAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors here (e.g., redirect to login on 401)
        if (error.response?.status === 401) {
            // Handle unauthorized access
            console.error('Unauthorized access - potentially redirect to login');
        }
        return Promise.reject(error);
    }
);

export default appAxios;
