import * as express from 'express';
import * as path from 'path';

//Validatores
import UserValidations from '../app/validators/UserValidations';
import JWTValidations from '../app/validators/JWTValidations';

//Controllers
import UserController from '../app/controllers/UserController';
import JWTController from '../app/controllers/JWTController';
import MarketController from '../app/controllers/MarketController';

// Middlewares
import { ValidateRequestMiddleware } from '../app/middlewares/ValidateRequestMiddleware';

const routes = express.Router();

routes.get(
  '/public',
  express.static(path.resolve(__dirname, '..', '..', 'public'))
);

routes.get(
  '/token',
  JWTValidations.store,
  ValidateRequestMiddleware.validate,
  JWTController.getToken
)

routes.post(
  '/user',
  UserValidations.store,
  ValidateRequestMiddleware.validate,
  UserController.store
);

routes.get(
  '/user',
  UserValidations.get,
  ValidateRequestMiddleware.validate,
  UserController.get
);

routes.delete(
  '/user',
  UserValidations.delete,
  ValidateRequestMiddleware.validate,
  UserController.delete
);

// MARKET ----------------------------------------------------

routes.post(
  '/market',
  MarketController.store,
)



export default routes;
