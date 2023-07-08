import { User } from '../models/User';
import { ApiUserResponse } from '../models/api';
import api from '../utils/api';

interface ChangePassword {
	email: string;
	password: string;
	newPassword: string;
}

export async function edit(user: User): Promise<ApiUserResponse> {
	return await api
		.put('user', {
			user,
		})
		.then((res) => {
			return {
				status: res.status,
				token: res.data,
			};
		})
		.catch((e) => ({ status: e.response.status }));
}

export async function changePassword(
	data: ChangePassword
): Promise<ApiUserResponse> {
	return await api
		.put('user/password', {
			...data,
		})
		.then((res) => {
			return {
				status: res.status,
				token: res.data,
			};
		})
		.catch((e) => ({ status: e.response.status }));
}
