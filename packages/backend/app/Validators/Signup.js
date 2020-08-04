'use strict';

class Signup {
	get rules() {
		return {
			// validation rules
			login: 'required|unique:users,login',
			password: 'required',
		};
	}

	get validateAll() {
		return true;
	}

	get messages() {
		return {
			'login.required': 'You must provide an login address.',
			'login.unique': 'This login is already registered.',
			'password.required': 'You must provide a password',
		};
	}
	async fails(errorMessages) {
		return this.ctx.response.status(400).send(errorMessages);
	}
}

module.exports = Signup;
