import { RootState } from '../../store/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
	UserLogin,
	login,
	register,
	logout,
} from '../../services/auth.service';
import { User } from '../../models/User';

interface AuthState {
	loading: boolean;
	message?: string;
	isRegistrationSuccessful: boolean;
}

const initialState: AuthState = {
	loading: false,
	message: undefined,
	isRegistrationSuccessful: false,
};

export const userLogin = createAsyncThunk(
	'auth/login',
	async (user: UserLogin, thunkAPI) => {
		const res = await login(user);
		return res;
	}
);

export const userRegister = createAsyncThunk(
	'auth/register',
	async (user: User) => {
		const res = await register(user);
		return res;
	}
);

export const userLogout = createAsyncThunk('auth/logout', async () => {
	await logout();
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(userRegister.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(userRegister.fulfilled, (state, { payload }) => {
			if (payload.status === 409) {
				state.message = 'Konto z takim emailem juz istnieje';
			}
			if (payload.status === 500) {
				state.message = 'Spróbuj ponownie';
			}
			if (payload.status === 200) {
				state.message = '';
				state.isRegistrationSuccessful = true;
			}
			state.loading = false;
		});

		builder.addCase(userLogin.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(userLogin.fulfilled, (state, action) => {
			if (action.payload.token) {
				state.message = undefined;
				localStorage.setItem('token', action.payload.token);
			}
			if (action.payload.status === 401) {
				state.message = 'Błędne dane logowania';
			}
			if (action.payload.status === 404) {
				state.message = 'Brak uzytkownika w systemie';
			}
			if (action.payload.status === 500) {
				state.message = 'Spróbuj ponownie';
			}
			state.loading = false;
		});
	},
});

export const selectMessage = (state: RootState) => state.authReducer.message;
export default authSlice.reducer;
