import {
	createUserWithEmailAndPassword,
	updateProfile,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();
export const registerUser = async ({ email, password, nombres, apellidos }) => {
	try {
		const resp = await createUserWithEmailAndPassword(
			FirebaseAuth,
			email,
			password
		);
		const { uid, photoURL, displayName } = resp.user;

		await updateProfile(FirebaseAuth.currentUser, {
			displayName: `${nombres} ${apellidos}`,
		});

		return {
			ok: true,
			uid,
			password,
			displayName,
			photoURL,
			nombres,
			apellidos,
		};
	} catch (error) {
		if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
			const errorMessage = 'correo electrónico ya en uso.';
			return {
				ok: false,
				errorMessage,
			};
		}
		return { ok: false, errorMessage: error.message };
	}
};

export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(FirebaseAuth, googleProvider);
		const { displayName, email, photoURL, uid } = result.user;
		return {
			ok: true,
			displayName,
			email,
			photoURL,
			uid,
		};
	} catch (error) {
		const errorMessage = error.message;
		return {
			ok: false,
			errorMessage,
		};
	}
};

export const loginWithEmailPassword = async ({ email, password }) => {
	try {
		const result = await signInWithEmailAndPassword(
			FirebaseAuth,
			email,
			password
		);
		const { displayName, photoURL, uid } = result.user;
		return {
			ok: true,
			displayName,
			photoURL,
			uid,
			email,
		};
	} catch (error) {
		console.log(error.message);
		const errorMessage = error.message;
		return {
			ok: false,
			errorMessage,
		};
	}
};

export const logoutFirebase = async () => {
	return await FirebaseAuth.signOut();
};
