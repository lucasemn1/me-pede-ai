import * as express from 'express';
import * as path from 'path';
import { UserValidations } from '../app/validators/UserValidations';
import { UserController } from '../app/controllers/UserController';
import { ValidateRequestMiddleware } from '../app/middlewarers/ValidateRequestMiddleware';
import { TokenController } from '../app/controllers/TokenController';
import { TokenValidations } from '../app/validators/TokenValidations';

const routes = express.Router();

routes.get('/public', express.static(path.resolve(__dirname, '..', '..', 'public')));

routes.get('/', (request, response) => {
  return response.send("Hello World");
});

routes.post('/user', UserValidations.store, ValidateRequestMiddleware.valide, UserController.store);

routes.post('/user/token', TokenValidations.store, ValidateRequestMiddleware.valide, TokenController.store);

export default routes;