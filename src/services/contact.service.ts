import { ApiResponse } from '../models/api';
import { ContactMessageModel } from '../models/ContactMessage';
import api from '../utils/api';

export const sendMessage = async (
	msg: ContactMessageModel
): Promise<ApiResponse<ContactMessageModel>> => {
	return await api
		.post('contact', {
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
