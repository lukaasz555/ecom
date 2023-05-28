import type { RootState } from '../../store/store';
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/User';

import { userLogin, userRegister, userLogout } from '../auth/authSlice';

interface UserState {
	isUserLoggedIn: boolean;
	user?: User;
}

const initialState: UserState = {
	isUserLoggedIn: false,
	user: undefined,
};

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
	},
});

export const selectUser = (state: RootState) => state.userReducer.user;
export default userSlice.reducer;
