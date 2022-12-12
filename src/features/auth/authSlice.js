import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	status: 'no-authenticated',
	uid: null,
	email: null,
	nombres: null,
	displayName: null,
	apellidos: null,
	photoURL: null,
	errorMessage: null,
};

export const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, { payload }) => {
			state.status = 'authenticated';
			state.uid = payload.uid;
			state.displayName = payload.displayName;
			state.email = payload.email;
			state.nombres = payload.nombres;
			state.apellidos = payload.apellidos;
			state.photoURL = payload.photoURL;
			state.errorMessage = null;
		},
		logout: (state, { payload }) => {
			state.status = 'no-authenticated';
			state.uid = null;
			state.email = null;
			state.displayName = null;
			state.nombres = null;
			state.apellidos = null;
			state.photoURL = null;
			state.errorMessage = payload.errorMessage;
		},
		checkingCredentials: state => {
			state.status = 'checking';
		},
	},
});

export const { login, logout, checkingCredentials } = AuthSlice.actions;
