import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL as string;

const api: AxiosInstance = axios.create({
	baseURL: SERVER_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${token}`,
		};
	}

	return config;
});

export default api;
