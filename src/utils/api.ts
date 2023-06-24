import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { store } from '../store/store';

const SERVER_URL = process.env.REACT_APP_SERVER_URL as string;

const api: AxiosInstance = axios.create({
	baseURL: SERVER_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
	const state = store.getState();
	const token = state.userReducer.token;

	if (token) {
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${token}`,
		};
	}

	return config;
});

export default api;
