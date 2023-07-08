import type { RootState } from '../../store/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/User';
import { userLogin, userLogout } from '../auth/authSlice';
import { edit } from '../../services/user.service';
import { changePassword } from '../../services/user.service';
import { getDataFromJWT } from '../../helpers/getDataFromJWT';

interface UserState {
	isUserLoggedIn: boolean;
	isLoading: boolean;
	message?: string;
	user?: User;
	token?: string;
}

interface PasswordChange {
	email: string;
	password: string;
	newPassword: string;
}

const initialState: UserState = {
	isUserLoggedIn: false,
	user: undefined,
	message: undefined,
	isLoading: false,
};

export const userEdit = createAsyncThunk(
	'user/edit',
	async (user: User, thunkAPI) => {
		const res = await edit(user);
		return res;
	}
);

export const userPasswordEdit = createAsyncThunk(
	'user/password',
	async (data: PasswordChange, thunkAPI) => {
		return await changePassword(data);
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetMessage: (state) => {
			state.message = undefined;
		},
	},
	extraReducers(builder) {
		builder.addCase(userLogin.fulfilled, (state, action) => {
			if (action.payload.token) {
				state.isUserLoggedIn = true;
				state.token = action.payload.token;
				state.user = getDataFromJWT<User>(action.payload.token);
			}
		});
		builder.addCase(userLogout.fulfilled, (state, action) => {
			state.isUserLoggedIn = false;
			state.user = undefined;
			state.token = undefined;
		});
		builder.addCase(userEdit.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(userEdit.fulfilled, (state, action) => {
			if (action.payload.token) {
				state.token = action.payload.token;
				state.user = getDataFromJWT<User>(action.payload.token);
				state.message = 'Aktualizacja zakończona pomyślnie';
			} else {
				state.message = 'Aktualizacja nieudana';
			}
			state.isLoading = false;
		});
		builder.addCase(userPasswordEdit.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(userPasswordEdit.fulfilled, (state, action) => {
			if (action.payload.token) {
				state.token = action.payload.token;
				state.user = getDataFromJWT<User>(action.payload.token);
				state.message = 'Aktualizacja zakończona pomyślnie';
			} else {
				state.message = 'Aktualizacja nieudana';
			}
			state.isLoading = false;
		});
	},
});

export const { resetMessage } = userSlice.actions;
export const selectUser = (state: RootState) => state.userReducer.user;
export const selectToken = (state: RootState) => state.userReducer.token;
export default userSlice.reducer;
