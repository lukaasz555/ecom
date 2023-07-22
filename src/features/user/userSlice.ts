import type { RootState } from '../../store/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User } from '../../models/User';
import { userLogin, userLogout } from '../auth/authSlice';
import { edit } from '../../services/user.service';
import { changePassword } from '../../services/user.service';
import { getDataFromJWT } from '../../helpers/getDataFromJWT';

interface UserState {
	isLoading: boolean;
	isError: boolean;
	message?: string;
	user?: User;
}

interface PasswordChange {
	email: string;
	password: string;
	newPassword: string;
}

const initialState: UserState = {
	user: undefined,
	message: undefined,
	isLoading: false,
	isError: false,
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
				state.user = getDataFromJWT<User>(action.payload.token);
			}
		});
		builder.addCase(userLogout.fulfilled, (state, action) => {
			state.user = undefined;
		});
		builder.addCase(userEdit.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(userEdit.fulfilled, (state, action) => {
			if (action.payload.token) {
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
export default userSlice.reducer;
