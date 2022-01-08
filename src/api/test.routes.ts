import * as express from 'express';
import * as mongodb from 'mongodb';
import { MongoHelper } from '../db/mongo.helper';
import * as TestController from '../controllers/test.controller';
import { auth } from '../middleware/auth';

const testRoutes = express.Router();

// testRoutes.get('/api/todo', auth, TodoController.getTodos);
testRoutes.post('/api/test', auth, TestController.create);
testRoutes.put('/api/test/', auth, TestController.addOwnListener);
testRoutes.delete('/api/test/', auth, TestController.removeOwnListener);

export { testRoutes }