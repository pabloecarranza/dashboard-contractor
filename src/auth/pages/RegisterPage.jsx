import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startCreatingUser } from '../../features/auth/thunks';
import { useForm } from '../../hooks/useForm';
import { AuthLayout } from './../layout/AuthLayout';

const FormData = {
	email: '',
	password: '',
	nombres: '',
	apellidos: '',
};

const formValidations = {
	email: [value => value.includes('@'), 'El correo debe contener una @'],
	password: [
		value => value.length >= 6,
		'La contraseña debe tener mas de 6 letras.',
	],
	nombres: [value => value.length >= 1, 'El campo Nombre(s) es obligatorio.'],
	apellidos: [value => value.length >= 1, 'El campo Apellidos es obligatorio.'],
};

const RegisterPage = () => {
	const dispatch = useDispatch();
	const [formSubmitted, setFromSubmitted] = useState(false);

	const {
		email,
		password,
		nombres,
		apellidos,
		onInputChange,
		formState,
		isFormValid,
		nombresValid,
		apellidosValid,
		emailValid,
		passwordValid,
	} = useForm(FormData, formValidations);

	const onSubmit = event => {
		event.preventDefault();
		setFromSubmitted(true);

		if (!isFormValid) return;

		dispatch(startCreatingUser(formState));
	};

	const { status } = useSelector(state => state.AuthSlice);
	const isAuthenticating = useMemo(() => status === 'checking', [status]);

	return (
		<AuthLayout title='Registrate'>
			<span className='text-gray-500 font-medium'>
				¿Ya tienes un usuario?{' '}
				<Link
					href='#'
					className='text-cyan-500 hover:underline'
					to='/auth/login'
				>
					Inicia sesión
				</Link>
			</span>
			<form className='mt-8' onSubmit={onSubmit}>
				<div className='max-w-lg mb-4 flex flex-row md:flex-row items-center justify-between gap-4'>
					<input
						type='text'
						autoComplete='off'
						className='w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group'
						placeholder='Nombre(s)'
						name='nombres'
						value={nombres}
						onChange={onInputChange}
					/>
					<input
						type='text'
						autoComplete='off'
						className='w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group'
						/* si hay error => outline outline-2 outline-red-800   sino =>   outline-none */
						placeholder='Apellidos'
						name='apellidos'
						value={apellidos}
						onChange={onInputChange}
					/>
				</div>
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
				<div className='max-w-lg flex justify-center md:justify-end mb-6'>
					{formSubmitted ? (
						<p
							id='helper-text-explanation'
							className='mt-2 text-sm text-gray-500 dark:text-gray-400 mb-4'
						>
							{nombresValid || apellidosValid || emailValid || passwordValid ? (
								<span
									href='#'
									className='font-medium text-cyan-500 hover:underline dark:text-red-500'
								>
									Error de validación{' '}
								</span>
							) : (
								''
							)}
							{nombresValid || apellidosValid || emailValid || passwordValid}
						</p>
					) : (
						''
					)}
				</div>
				<div className='max-w-lg'>
					<button
						className='bg-cyan-600 text-white w-full py-3 px-4 rounded-full hover:bg-cyan-700 transition-colors'
						type='submit'
						disabled={isAuthenticating}
					>
						Crear Cuenta
					</button>
				</div>
			</form>
		</AuthLayout>
	);
};

export default RegisterPage;
