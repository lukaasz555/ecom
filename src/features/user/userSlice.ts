import type { RootState } from '../../store/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/User';
import userService from '../../services/user.service';
import { UserLogin } from '../../services/user.service';
import { ApiResponse } from '../../models/api';

interface UserState {
	isUserLoggedIn: boolean;
	user?: User;
}

const initialState: UserState = {
	isUserLoggedIn: false,
	user: undefined,
};

export const userLogin = createAsyncThunk(
	'user/login',
	async (user: UserLogin, thunkAPI) => {
		const res: ApiResponse<User> = await userService.login(user);
		return res.data;
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
			state.isUserLoggedIn = true;
			state.user = action.payload;
		});
		builder.addCase(userLogout.fulfilled, (state, action) => {
			state.isUserLoggedIn = false;
			state.user = undefined;
		});
	},
});

export const selectUser = (state: RootState) => state.userReducer.user;
export default userSlice.reducer;
