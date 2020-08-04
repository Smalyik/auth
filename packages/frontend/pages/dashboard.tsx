import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { Row, Col } from 'react-bootstrap';
import api from '../api/api';
import { routes } from '../api/routes';

import useSWR from 'swr';
import { useAuth } from '../context/auth';
import Router from 'next/router';

import { User } from '../components/User';

export default function Dashboard() {
	const [users, setUsers] = useState([]);

	const { isAuthenticated } = useAuth();

	const { data, error } = useSWR(isAuthenticated ? routes.users : null, api.post);

	useEffect(() => {
		setUsers(data?.data);
	}, [data]);

	useEffect(() => {
		if (!isAuthenticated) Router.push('/');
	}, [isAuthenticated]);

	const changeUserInfo: User['changeInfo'] = async (e, login, password, id) => {
		e.preventDefault();
		const newLogin = e.target.elements['login'].value;
		const newPassword = e.target.elements['password'].value;
		try {
			await api.put(routes.changeUser + id, { login, newLogin, password, newPassword, id });
			Router.reload();
		} catch (e) {
			console.log(e);
		}
	};

	const deleteUser: User['deleteUser'] = async id => {
		try {
			await api.delete(routes.deleteUser + id);
			Router.reload();
		} catch (e) {
			console.log(e);
		}
	};

	if (error) return <p> There was an error </p>;
	if (!users) return <p> Loading... </p>;

	return (
		<MainLayout>
			<Row>
				<Col className="pt-5">
					<h1>Dashboard</h1>
				</Col>
			</Row>
			<Row>
				<Col md="6" className="pt-3">
					{users.map(user => {
						return (
							<User
								changeInfo={changeUserInfo}
								deleteUser={deleteUser}
								id={user.id}
								login={user.login}
								password={user.password}
								key={user.id}
							/>
						);
					})}
				</Col>
			</Row>
		</MainLayout>
	);
}
