import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkingCredentials } from '../../features/auth/authSlice';
import { useForm } from '../../hooks/useForm';
import { AuthLayout } from '../layout/AuthLayout';
import { startGoogleSignIn } from './../../features/auth/thunks';

const formData = {
	email: '',
	password: '',
};

const formValidations = {
	email: [value => value.includes('@'), 'El correo debe contener una @'],
	password: [
		value => value.length >= 6,
		'La contraseña debe tener mas de 6 letras.',
	],
};

const LoginPage = () => {
	const dispatch = useDispatch();
	const [formSubmitted, setFromSubmitted] = useState(false);

	const {
		email,
		password,
		onInputChange,
		emailValid,
		passwordValid,
		isFormValid,
	} = useForm(formData, formValidations);

	const onSubmit = event => {
		event.preventDefault();
		setFromSubmitted(true);
		dispatch(checkingCredentials());
	};

	const onGoogleSignIn = event => {
		event.preventDefault();
		dispatch(startGoogleSignIn());
	};

	const { status } = useSelector(state => state.AuthSlice);
	const isAuthenticating = useMemo(() => status === 'checking', [status]);

	return (
		<AuthLayout title='Inicia sesión'>
			<span className='text-gray-500 font-medium'>
				¿No eres usuario?{' '}
				<Link
					href='#'
					className='text-cyan-500 hover:underline'
					to='/auth/register'
				>
					Registrate
				</Link>
			</span>
			<form className='mt-8'>
				<div className='max-w-lg mb-4'>
					<input
						type='email'
						autoComplete='off'
						className='w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group'
						placeholder='Correo electrónico'
						name='email'
						value={email}
						onChange={onInputChange}
					/>
				</div>
				<div className='max-w-lg mb-4'>
					<input
						type='password'
						autoComplete='off'
						className='w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group'
						placeholder='Contraseña'
						name='password'
						value={password}
						onChange={onInputChange}
					/>
				</div>
				<div className='max-w-lg flex-col justify-center md:justify-end mb-6'>
					{formSubmitted ? (
						<p
							id='helper-text-explanation'
							className='mt-2 text-sm text-gray-500 dark:text-gray-400 mb-4'
						>
							{emailValid || passwordValid ? (
								<span
									href='#'
									className='font-medium text-cyan-500 hover:underline dark:text-red-500'
								>
									Error de validación{' '}
								</span>
							) : (
								''
							)}
							{emailValid || passwordValid}
						</p>
					) : (
						''
					)}
					<a
						href='#'
						className='text-gray-500 font-medium hover:text-gray-300 transition-colors'
					>
						¿Olvidaste tu contraseña?
					</a>
				</div>
				<div className='max-w-lg flex-col'>
					<button
						className='bg-cyan-600 text-white w-full py-3 px-4 rounded-full hover:bg-cyan-700 transition-colors disabled:bg-zinc-600'
						onClick={onSubmit}
						disabled={isAuthenticating}
					>
						Iniciar sesión
					</button>
					<p className='mt-2 text-sm text-gray-500 dark:text-gray-400 mb-4 text-center'>
						<span>Inicia sesión con </span>
						<button
							href='#'
							className='font-medium text-cyan-500 hover:underline dark:text-cyan-500'
							onClick={onGoogleSignIn}
						>
							Google
						</button>
					</p>
				</div>
			</form>
		</AuthLayout>
	);
};

export default LoginPage;
