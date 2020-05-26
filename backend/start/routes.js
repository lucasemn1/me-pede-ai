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
Route
  .on('/')
  .render('welcome')

Route
  .post('/user/store', 'UserController.store')
  .validator(['StoreUser'])

Route
  .put('/user/update', 'UserController.update')
  .middleware(['auth'])
  .validator(['UpdateUser'])

Route
  .delete('/user/destroy', 'UserController.destroy')
  .middleware(['auth'])

Route
  .get('/users', 'UserController.index')
  .middleware(['authAsSuperUser'])


// User Picture
Route.post('/user/store/picture', 'UserPictureController.store')
  .middleware(['auth'])

Route.get('/user/picture', 'UserPictureController.show')
  .middleware(['auth'])

Route.put('/user/update/picture', 'UserPictureController.update')
.middleware(['auth'])

Route.delete('/user/delete/picture', 'UserPictureController.delete')
  .middleware(['auth'])


//Session
Route.post('/session/login', 'JwtController.login')

Route.get('/session/me', 'JwtController.me')
  .middleware(['auth']);


//Market
Route.get('/markets', 'MarketController.index')

Route
  .post('/market/store', 'MarketController.store')
  .middleware(['authAsSuperUser'])
  .validator(['StoreMarket'])

Route.get('/market/show/:id', 'MarketController.show')

Route
  .put('/market/update/:id', 'MarketController.update')
  .middleware(['authAsSuperUser'])
  .validator(['UpdateMarket'])

Route
  .delete('/market/delete/:id', 'MarketController.delete')
  .middleware(['authAsSuperUser'])

//Market Picture
Route
  .post('/market/store/picture/:marketId', 'MarketPictureController.store')
  .middleware(['authAsSuperUser'])

Route
  .put('/market/update/picture/:marketId', 'MarketPictureController.update')
  .middleware(['authAsSuperUser'])

Route.get('/market/:id/picture', 'MarketPictureController.show')

Route.delete('/market/delete/picture/:marketId', 'MarketPictureController.destroy')
  .middleware(['authAsSuperUser'])


//Product
Route.post('/product/store', 'ProductController.store')
  .middleware(['auth', 'marketAdm'])
  .validator(['StoreProduct'])

Route.put('/product/update/:id', 'ProductController.update')
  .validator(['UpdateProduct'])
  .middleware(['auth', 'marketAdm', 'productMarket'])

Route.delete('/product/delete/:id', 'ProductController.delete')
  .middleware(['auth', 'marketAdm', 'productMarket'])

Route.get('/products/:page?', 'ProductController.index')

Route.get('/product/:id', 'ProductController.show')


//Product picture
Route
  .post('/product/:productId/store/picture/', 'ProductPictureController.store')
  .middleware(['auth', 'marketAdm'])