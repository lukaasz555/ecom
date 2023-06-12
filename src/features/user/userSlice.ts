import type { RootState } from '../../store/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/User';
import { userLogin, userLogout } from '../auth/authSlice';
import userService from '../../services/user.service';

interface UserState {
	isUserLoggedIn: boolean;
	user?: User;
}

const initialState: UserState = {
	isUserLoggedIn: false,
	user: undefined,
};

export const userEdit = createAsyncThunk(
	'user/edit',
	async (user: User, thunkAPI) => {
		const res = await userService.edit(user);
		return res;
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(userLogin.fulfilled, (state, action) => {
			if (action.payload.data) {
				state.isUserLoggedIn = true;
				state.user = action.payload.data;
			}
		});
		builder.addCase(userLogout.fulfilled, (state, action) => {
			state.isUserLoggedIn = false;
			state.user = undefined;
		});
		builder.addCase(userEdit.fulfilled, (state, action) => {
			state.user = action.payload.data;
		});
	},
});

export const selectUser = (state: RootState) => state.userReducer.user;
export default userSlice.reducer;
