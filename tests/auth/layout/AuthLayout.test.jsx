import { screen, fireEvent, render } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import { AuthLayout } from './../../../src/auth/layout/AuthLayout';

describe('Name of the group', () => {
	it('should ', () => {
		render(<AuthLayout title='hola' />);

		screen.debug();
	});
});
