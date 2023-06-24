import { User } from '../models/User';
import { ApiUserResponse } from '../models/api';
import api from '../utils/api';

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

const userService = { edit };
export default userService;
