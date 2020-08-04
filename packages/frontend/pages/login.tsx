import React from 'react';

import { routes } from '../api/routes';
import AuthForm from '../components/AuthForm';

export default function login() {
	return <AuthForm route={routes.login} title={'Login'} />;
}
