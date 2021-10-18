import * as express from 'express';
import * as UserController from '../controllers/user.controller';

const authRoutes = express.Router();

authRoutes.post('/api/register', UserController.register);
authRoutes.get('/api/login', UserController.login);

export { authRoutes }