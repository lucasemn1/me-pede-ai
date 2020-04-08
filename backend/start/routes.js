'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.post('/users/store', 'UserController.store');
Route.get('/users', 'UserController.index');

// Route.on('/').render('welcome')
Route.post('/session/login', 'JwtController.login');
Route.get('/session/me', 'JwtController.me');
Route.get('/session/tokens', 'JwtController.listTokens');
Route.delete('/session/logout', 'JwtController.logout');
// Route.get('/users', 'UserController.index');
