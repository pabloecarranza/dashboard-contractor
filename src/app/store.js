import { configureStore } from '@reduxjs/toolkit';
import { AuthSlice } from './../features/auth/authSlice';

const store = configureStore({
	reducer: {
		AuthSlice: AuthSlice.reducer,
	},
});

export default store;
