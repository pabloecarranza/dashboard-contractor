import {
	registerUser,
	signInWithGoogle,
	loginWithEmailPassword,
	logoutFirebase,
} from '../../firebase/providers';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email, password) => {
	return async dispatch => {
		dispatch(checkingCredentials());
	};
};

export const startCreatingUser = ({ email, nombres, apellidos, password }) => {
	return async dispatch => {
		const displayName = nombres + ' ' + apellidos;
		dispatch(checkingCredentials());
		const { ok, uid, photoURL, errorMessage } = await registerUser({
			email,
			nombres,
			apellidos,
			password,
		});
		if (!ok) return dispatch(logout({ errorMessage }));
		dispatch(
			login({ email, nombres, apellidos, password, photoURL, uid, displayName })
		);
	};
};

export const startGoogleSignIn = () => {
	return async dispatch => {
		dispatch(checkingCredentials());

		const result = await signInWithGoogle();
		if (!result.ok) dispatch(logout(result.errorMessage));

		dispatch(login(result));
	};
};

export const startLoginWithEmailPassword = ({ email, password }) => {
	return async dispatch => {
		dispatch(checkingCredentials());
		const result = await loginWithEmailPassword({ email, password });
		if (!result.ok) {
			if (result.errorMessage === 'Firebase: Error (auth/user-not-found).') {
				const result = {
					errorMessage: 'usuario no encontrado.',
				};
				dispatch(logout(result));
				console.log(result);
				return;
			}
		}
		dispatch(login(result));
	};
};

export const startLogout = () => {
	return async dispatch => {
		await logoutFirebase();
		dispatch(logout());
	};
};
