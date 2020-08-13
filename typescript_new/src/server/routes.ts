import * as express from 'express';
import * as path from 'path';

const routes = express.Router();

routes.get('/public', express.static(path.resolve(__dirname, '..', '..', 'public')));

routes.get('/', (request, response) => {
  return response.send("Hello World");
});

export default routes;