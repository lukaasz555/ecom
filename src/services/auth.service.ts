import { User } from '../models/User';
import { ApiResponse } from '../models/api';
import axios from 'axios';
import { ApiUserResponse } from '../models/api';

const URL = process.env.REACT_APP_SERVER_URL;

export interface UserLogin {
	email: string;
	password: string;
}

async function login(user: UserLogin): Promise<ApiUserResponse> {
	return await axios
		.post(`${URL}/auth/login`, user)
		.then((res) => ({
			status: res.status,
			token: res.data,
		}))
		.catch((e) => ({ status: e.response.status }));
}

async function register(newUser: User): Promise<ApiResponse<User>> {
	return await axios
		.post(`${URL}/auth/register`, newUser)
		.then((res) => ({
			status: res.status,
			data: res.data,
		}))
		.catch((e) => ({ status: e.response.status }));
}

async function logout(): Promise<void> {
	localStorage.removeItem('user');
}

const authService = { register, login, logout };
export default authService;
