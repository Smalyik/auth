import React, { useState } from 'react';
import { routes } from '../api/routes';
import api from '../api/api';
import { mutate } from 'swr';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { FaTrash, FaUndo, FaCheck } from 'react-icons/fa';

export interface User {
	id: number;
	login: string;
	password: string;
	changeInfo: (
		e: React.FormEvent<HTMLElement>,
		login: User['login'],
		password: User['password'],
		id: User['id']
	) => Promise<void>;
	deleteUser: (login: User['login']) => Promise<void>;
}
export const User: React.FC<User> = ({ id, login, password, deleteUser, changeInfo }) => {
	const [isEdit, setIsEdit] = useState(false);

	return (
		<Row className="pb-4">
			<Col>
				<div>
					<strong>User: {login}</strong>
					<Button className="ml-2" onClick={() => setIsEdit(!isEdit)}>
						Edit
					</Button>
					<Button className="ml-2" onClick={() => deleteUser(id)}>
						Delete
					</Button>
				</div>
				{isEdit && (
					<Form onSubmit={e => changeInfo(e, login, password, id)}>
						<Form.Group controlId={`formBasicLogin${id}`}>
							<Form.Label>Login</Form.Label>
							<Form.Control name="login" placeholder="Enter new login" />
						</Form.Group>

						<Form.Group controlId={`formBasicPassword${id}`}>
							<Form.Label>New Password</Form.Label>
							<Form.Control name="password" type="password" placeholder="Enter new password" />
						</Form.Group>

						<Button variant="primary" type="submit" className="btn-block">
							Submit
						</Button>
					</Form>
				)}
			</Col>
		</Row>
	);
};
