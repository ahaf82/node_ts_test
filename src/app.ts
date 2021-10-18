import * as express from 'express';
import * as cors from 'cors';
import * as bodyparser from 'body-parser';
import { requestLoggerMiddleware } from './middleware/request.logger.middleware';
import { authRoutes } from './api/auth.routes';
import { todoRoutes } from './api/todo.routes';

const app = express();
app.use(cors());
app.use(bodyparser.json());

// TODO - Add more middleware
app.use(requestLoggerMiddleware);
app.use(authRoutes);
app.use(todoRoutes);

export { app }