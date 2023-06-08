import { User } from '../models/User';
import { ApiResponse } from '../models/api';
import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL;

export async function edit(user: User): Promise<ApiResponse<User>> {
	return await axios
		.put(`${URL}/user`, {
			user,
		})
		.then((res) => ({
			status: res.status,
			data: res.data,
		}))
		.catch((e) => ({ status: e.response.status }));
}

const userService = { edit };
export default userService;
