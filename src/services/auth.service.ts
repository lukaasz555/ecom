import { User } from '../models/User';
import { ApiResponse, ApiUserResponse } from '../models/api';
import api from '../utils/api';

export interface UserLogin {
	email: string;
	password: string;
}

export async function login(user: UserLogin): Promise<ApiUserResponse> {
	return await api
		.post(`auth/login`, user)
		.then((res) => {
			localStorage.setItem('token', res.data);
			return {
				status: res.status,
				token: res.data,
			};
		})
		.catch((e) => ({ status: e.response.status }));
}

export async function register(newUser: User): Promise<ApiResponse<User>> {
	return await api
		.post(`auth/register`, newUser)
		.then((res) => ({
			status: res.status,
			data: res.data,
		}))
		.catch((e) => ({ status: e.response.status }));
}

export async function logout(): Promise<void> {
	localStorage.removeItem('user');
	localStorage.removeItem('token');
}
