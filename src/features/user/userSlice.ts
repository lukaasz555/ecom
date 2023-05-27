import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/User';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';
import { createNewUser } from '../../services/user.service';

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
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			createNewUser(action.payload);
		},
	},
});

export const { addNewUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.userReducer.user;
export default userSlice.reducer;
