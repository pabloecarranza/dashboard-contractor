export const CheckingAuth = () => {
	return (
		<div className='register flex flex-col min-h-screen  md:p-8'>
			<div className='p-8'>
				<h1 className='text-gray-100 text-3xl font-medium tracking-widest'>
					TRINITY Renovations
				</h1>
			</div>
			<div className='p-8'>
				<h3 className='text-gray-500 uppercase text-sm font-bold mb-2'>
					Ingresa a la plataforma
				</h3>
			</div>
			<p className='mt-2 text-sm text-gray-500 dark:text-gray-400 mb-4 text-center pt-3'>
				<span
					href='#'
					className='font-medium text-cyan-500  dark:text-cyan-500'
				>
					Cargando{' '}
				</span>
				<span>aguarde un momento por favor... </span>
			</p>
		</div>
	);
};
