import {
	createUserWithEmailAndPassword,
	updateProfile,
	GoogleAuthProvider,
	signInWithPopup,
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
		const { uid, photoURL } = resp.user;

		updateProfile(FirebaseAuth.currentUser, {
			displayName: `${nombres} ${apellidos}`,
		});

		return {
			ok: true,
			uid,
			password,
			photoURL,
			nombres,
			apellidos,
		};
	} catch (error) {
		console.log(error);
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
