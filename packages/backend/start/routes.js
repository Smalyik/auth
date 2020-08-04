'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
	return { greeting: 'Hello world in JSON' };
});

Route.post('/auth/signup', 'UserController.signup').validator(['Signup']);
Route.post('/auth/login', 'UserController.login').validator(['Login']);

Route.get('users/me', 'UserController.me').middleware('auth');

Route.post('users/all', 'UserController.getUsers').middleware('auth');
Route.put('/change/:id', 'UserController.changeInfo').middleware('auth');
Route.delete('/delete/:id', 'UserController.deleteUser').middleware('auth');
