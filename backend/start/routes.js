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

//User
Route.on('/').render('welcome')
Route.post('/users/store', 'UserController.store');
Route.get('/users', 'UserController.index');

//Session
Route.post('/session/login', 'JwtController.login');
Route.get('/session/me', 'JwtController.me');

//Market
Route.post('/market/store', 'MarketController.store')
Route.get('/market/show/:id', 'MarketController.show')
Route.put('/market/update/:id', 'MarketController.update')
Route.delete('/market/delete/:id', 'MarketController.delete')
