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
Route.post('/user/store', 'UserController.store').validator({name: 'required'})
Route.put('/user/update', 'UserController.update').middleware(['auth'])
Route.get('/users', 'UserController.index').middleware(['authAsSuperUser'])

//Session
Route.post('/session/login', 'JwtController.login')
Route.get('/session/me', 'JwtController.me').middleware(['auth']);

//Market
Route.get('/markets', 'MarketController.index')
Route.post('/market/store', 'MarketController.store').middleware(['authAsSuperUser'])
Route.get('/market/show/:id', 'MarketController.show')
Route.put('/market/update/:id', 'MarketController.update').middleware(['authAsSuperUser'])
Route.delete('/market/delete/:id', 'MarketController.delete').middleware(['authAsSuperUser'])

//Market Picture
Route.post('/market/store/photo/:marketId', 'MarketPictureController.store').middleware(['authAsSuperUser'])
Route.put('/market/update/photo/:marketId', 'MarketPictureController.update').middleware(['authAsSuperUser'])
Route.get('/market/:id/photo', 'MarketPictureController.show')
