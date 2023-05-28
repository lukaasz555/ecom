import { User } from '../models/User';
import { ApiResponse } from '../models/api';
import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL;

export interface UserLogin {
	email: string;
	password: string;
}

async function login(user: UserLogin): Promise<ApiResponse<User>> {
	return await axios
		.post(`${URL}/user/login`, user)
		.then((res) => ({
			status: res.status,
			data: res.data,
		}))
		.catch((e) => ({ status: e.response.status }));
}

async function register(newUser: User): Promise<ApiResponse<User>> {
	return await axios
		.post(`${URL}/user/register`, newUser)
		.then((res) => ({
			status: res.status,
			data: res.data,
		}))
		.catch((e) => ({ status: e.response.status }));
}

async function logout(): Promise<void> {
	localStorage.removeItem('user');
}

const userService = { register, login, logout };
export default userService;
