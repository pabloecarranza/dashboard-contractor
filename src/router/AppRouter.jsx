import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthRoutes } from './../auth/routes/AuthRoutes';
import { ContractorRoutes } from './../contractor/routes/ContractorRoutes';
import { CheckingAuth } from '../components/CheckingAuth';
import { useCheckAuth } from './../hooks/useCheckAuth';

export const AppRouter = () => {
	const { status } = useCheckAuth();

	if (status === 'checking') {
		return <CheckingAuth />;
	}

	return (
		<Routes>
			{status === 'authenticated' ? (
				<Route path='/*' element={<ContractorRoutes />} />
			) : (
				<Route path='/auth/*' element={<AuthRoutes />} />
			)}
			<Route path='/*' element={<Navigate to='/auth/login' />} />
		</Routes>
	);
};
