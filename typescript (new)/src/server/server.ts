import * as express from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import routes from './routes';

const app = express();
dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

app.use(express.json());
app.use(routes);

app.listen(8000);
