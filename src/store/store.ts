import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/admin/ordersSlice';
import productReducer from '../features/admin/productsSlice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
	key: 'root',
	storage,
};

const rootReducer = combineReducers({
	cartReducer,
	ordersReducer,
	productReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
