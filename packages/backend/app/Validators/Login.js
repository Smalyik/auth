'use strict';

class Login {
	get rules() {
		return {
			// validation rules
			login: 'required',
			password: 'required',
		};
	}

	get validateAll() {
		return true;
	}

	get messages() {
		return {
			'login.required': 'You must provide an login.',
			'password.required': 'You must provide a password',
		};
	}
	async fails(errorMessages) {
		return this.ctx.response.status(400).send(errorMessages);
	}
}

module.exports = Login;
