import { Navigate, Route, Routes } from 'react-router-dom';
import { DashboardPage } from './../pages/DashboardPage';

export const ContractorRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<DashboardPage />} />
			<Route path='/*' element={<Navigate to='/' />} />
		</Routes>
	);
};
