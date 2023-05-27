import type { RootState } from '../../store/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/User';
import userService from '../../services/user.service';
import { UserLogin } from '../../services/user.service';
import { ApiResponse } from '../../models/api';

interface UserState {
	isUserLoggedIn: boolean;
	user?: User;
	message?: string;
}

const initialState: UserState = {
	isUserLoggedIn: false,
	user: undefined,
};

export const userLogin = createAsyncThunk(
	'user/login',
	async (user: UserLogin, thunkAPI) => {
		const res: ApiResponse<User> = await userService.login(user);
		console.log(res);
		return res;
	}
);

export const userRegister = createAsyncThunk(
	'user/register',
	async (user: User) => {
		const res = await userService.register(user);
		return res.data;
	}
);

export const userLogout = createAsyncThunk('user/logout', async () => {
	await userService.logout();
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(userLogin.fulfilled, (state, action) => {
			if (action.payload.data) {
				state.isUserLoggedIn = true;
				state.user = action.payload.data;
				state.message = undefined;
			}
			if (action.payload.status === 401) {
				state.message = 'Błędne dane logowania';
			}
			if (action.payload.status === 404) {
				state.message = 'Brak uzytkownika w systemie';
			}
		});
		builder.addCase(userLogout.fulfilled, (state, action) => {
			state.isUserLoggedIn = false;
			state.user = undefined;
		});
	},
});

export const selectUser = (state: RootState) => state.userReducer.user;
export const selectMessage = (state: RootState) => state.userReducer.message;
export default userSlice.reducer;
