import type { RootState } from '../../store/store';
import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/User';
import { userLogin, userLogout } from '../auth/authSlice';

interface UserState {
	isUserLoggedIn: boolean;
	user?: User;
}

interface UserAction {
	type: string;
	payload: User;
}

const initialState: UserState = {
	isUserLoggedIn: false,
	user: undefined,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: UserAction) => {
			state.user = action.payload;
		},
	},
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

export const { setUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.userReducer.user;
export default userSlice.reducer;
