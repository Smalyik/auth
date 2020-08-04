'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/auth/src/Schemes/Session')} AuthSession */

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} User */
const User = use('App/Models/User');
const Hash = use('Hash');

class UserController {
	/**
	 * @param {object} ctx
	 * @param {AuthSession} ctx.auth
	 * @param {Request} ctx.request
	 * @param {View} ctx.view
	 */
	async signup({ auth, request, view }) {
		const { login, password } = request.only(['login', 'password']);
		const newUser = await User.create({ login, password });

		const token = await auth.generate(newUser);
		return token;
	}

	/**
	 * @param {object} ctx
	 * @param {AuthSession} ctx.auth
	 * @param {Request} ctx.request
	 * @param {View} ctx.view
	 */
	async login({ auth, request, view, response }) {
		const { login, password } = request.only(['login', 'password']);
		try {
			const user = await auth.validate(login, password, true);
			return auth.generate(user);
		} catch (error) {
			return response.status(400).json([{ field: 'password', message: 'Invalid login or password' }]);
		}
	}

	/**
	 * @param {object} ctx
	 * @param {AuthSession} ctx.auth
	 * @param {Request} ctx.request
	 * @param {View} ctx.view
	 */
	async changeInfo({ auth, request, view, response }) {
		const { login, newLogin, password, newPassword, id } = request.only(['login', 'newLogin', 'newPassword', 'id']);
		try {
			await User.query()
				.where('id', id)
				.update({
					login: newLogin || login,
					password: newPassword ? await Hash.make(newPassword) : password,
				});
			return response.status(200).json([{ message: 'changes accepted' }]);
		} catch (error) {
			console.log(error);
			return response.status(400).json([{ field: 'password', message: 'error' }]);
		}
	}

	/**
	 * @param {object} ctx
	 * @param {AuthSession} ctx.auth
	 * @param {Request} ctx.request
	 * @param {View} ctx.view
	 */
	async deleteUser({ auth, request, view, response }) {
		let id = request.url().split('/');
		id = id[id.length - 1];
		try {
			await User.query().where('id', id).delete();
			return response.status(200).json([{ message: 'user deleted' }]);
		} catch (error) {
			return error;
		}
	}

	/**
	 * @param {object} ctx
	 * @param {AuthSession} ctx.auth
	 * @param {Request} ctx.request
	 * @param {View} ctx.view
	 */
	async getUsers({ auth, request, view, response }) {
		try {
			const users = await User.all();
			return response.status(200).json(users);
		} catch (error) {
			// return response.status(400).json(
			//   [{field: 'password', message: 'Invalid login or password'}]
			// )
			return error;
		}
	}

	async me({ auth }) {
		const user = await auth.getUser();
		return user;
	}
}
module.exports = UserController;
