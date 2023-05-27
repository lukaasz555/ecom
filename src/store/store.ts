import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/admin/ordersSlice';
import productsReducer from '../features/admin/productsSlice';
import userReducer from '../features/user/userSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
	key: 'root',
	storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
	reducer: {
		cartReducer: persistedCartReducer,
		userReducer: persistedUserReducer,
		productsReducer,
		ordersReducer,
	},
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
