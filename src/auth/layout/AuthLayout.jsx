// eslint-disable-next-line react/prop-types
export const AuthLayout = ({ children, title }) => {
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
				<h1 className='text-6xl text-white font-medium mb-2'>
					{title}
					<span className='text-cyan-500'>.</span>
				</h1>
				{children}
			</div>
		</div>
	);
};
