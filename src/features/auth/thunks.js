import { registerUser, signInWithGoogle } from '../../firebase/providers';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email, password) => {
	return async dispatch => {
		dispatch(checkingCredentials());
	};
};

export const startCreatingUser = ({ email, nombres, apellidos, password }) => {
	return async dispatch => {
		dispatch(checkingCredentials());
		const { ok, uid, photoURL, errorMessage } = await registerUser({
			email,
			nombres,
			apellidos,
			password,
		});
		if (!ok) return dispatch(logout({ errorMessage }));
		dispatch(login({ email, nombres, apellidos, password, photoURL, uid }));
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
