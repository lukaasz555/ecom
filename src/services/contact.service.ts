import { ApiResponse } from '../models/api';
import { ContactMessageModel } from '../models/ContactMessage';
import axios from 'axios';

const URL = process.env.REACT_APP_SERVER_URL;

export const sendMessage = async (
	msg: ContactMessageModel
): Promise<ApiResponse<ContactMessageModel>> => {
	return await axios
		.post(`${URL}/contact`, {
			message: msg.message,
			email: msg.email,
			subject: msg.subject,
		})
		.then((res) => ({
			status: res.status,
			data: res.data,
		}))
		.catch((e) => ({
			status: e.response.status,
		}));
};
