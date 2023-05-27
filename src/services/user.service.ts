import { User } from '../models/User';
import { ApiResponse } from '../models/api';
import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL;

export async function createNewUser(newUser: User): Promise<ApiResponse<User>> {
	return await axios
		.post(`${URL}/user/register`, newUser)
		.then((res) => ({
			status: res.status,
			data: res.data,
		}))
		.catch((e) => ({ status: e.response.status }));
}
