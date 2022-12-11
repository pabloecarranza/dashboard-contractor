import { Routes, Route } from 'react-router-dom';
import { AuthRoutes } from './../auth/routes/AuthRoutes';
import { ContractorRoutes } from './../contractor/routes/ContractorRoutes';

export const AppRouter = () => {
	return (
		<Routes>
			{/* Login y Registro */}
			<Route path='/auth/*' element={<AuthRoutes />} />
			{/* ContractorApp */}
			<Route path='/*' element={<ContractorRoutes />} />
		</Routes>
	);
};
