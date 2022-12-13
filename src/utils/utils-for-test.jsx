import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { authSlice } from '../features/api/authSlice';
import { listSlice } from '../features/api/listSlice';
import { sessionSlice } from '../features/api/sessionSlice';
import { taskSlice } from '../features/api/taskSlice';

export function renderWithProviders(
	ui,
	{
		preloadedState = {},
		store = configureStore({
			reducer: {
				authSlice: authSlice.reducer,
				listSlice: listSlice.reducer,
				taskSlice: taskSlice.reducer,
				session: sessionSlice.reducer,
			},
			middleware: getDefaultMiddleware =>
				getDefaultMiddleware().concat(
					authSlice.middleware,
					listSlice.middleware,
					taskSlice.middleware
				),
			preloadedState,
		}),
		...renderOptions
	} = {}
) {
	// eslint-disable-next-line react/prop-types
	function Wrapper({ children }) {
		return <Provider store={store}>{children}</Provider>;
	}

	// Return an object with the store and all of RTL's query functions
	return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
