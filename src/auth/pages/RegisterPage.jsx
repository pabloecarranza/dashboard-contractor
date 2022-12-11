import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkingCredentials } from '../../features/auth/authSlice';
import { useForm } from '../../hooks/useForm';
const RegisterPage = () => {
	const dispatch = useDispatch();
	const { email, password, onInputChange } = useForm({
		email: 'pablo@carranza.com',
		password: '123465',
	});

	const onSubmit = event => {
		event.preventDefault();
		console.log({ email, password });
		dispatch(checkingCredentials());
	};

	const { status } = useSelector(state => state.AuthSlice);
	const isAuthenticating = useMemo(() => status === 'checking', [status]);

	return (
		<div className='register flex flex-col min-h-screen  md:p-8'>
			<div className='p-8 mb-14'>
				<h1 className='text-gray-100 text-3xl font-medium tracking-widest'>
					TRINITY Renovations
				</h1>
			</div>
			<div className='p-8'>
				<h3 className='text-gray-500 uppercase text-sm font-bold mb-2'>
					Ingresa a la plataforma
				</h3>
				<h1 className='text-6xl text-white font-medium mb-2'>
					Registrate<span className='text-cyan-500'>.</span>
				</h1>
				<span className='text-gray-500 font-medium'>
					¿Ya tienes un usuario?{' '}
					<a href='#' className='text-cyan-500 hover:underline'>
						Inicia sesión
					</a>
				</span>
				<form className='mt-8' onSubmit={onSubmit}>
					<div className='max-w-lg mb-4'>
						<input
							type='email'
							autoComplete='off'
							className='w-full py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group'
							placeholder='Nombre Completo'
							name='email'
							value={email}
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
					<div className='max-w-lg flex justify-center md:justify-end mb-6'></div>
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
			</div>
		</div>
	);
};

export default RegisterPage;
