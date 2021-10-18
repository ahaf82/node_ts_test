import * as express from 'express';
import * as mongodb from 'mongodb';
import { MongoHelper } from '../db/mongo.helper';
import * as TodoController from '../controllers/todo.controller';
import { auth } from '../middleware/auth';

const todoRoutes = express.Router();

todoRoutes.get('/api/todo', auth, TodoController.getTodos);
todoRoutes.post('/api/todo', auth, TodoController.createTodo);
todoRoutes.put('/api/todo/:id', auth, TodoController.updateTodo);
todoRoutes.delete('/api/todo/:id', auth, TodoController.deleteTodo);

// const getCollection = () => {
// 	return MongoHelper.client.db('todo').collection('todos');
// }

// todoRoutes.get('/todo', (req: express.Request, resp: express.Response, next: express.NextFunction) => {
// 	const collection: any = getCollection();
// 	const result = collection.find({}).toArray((err, items) => {
// 		if (err) {
// 			resp.status(500);
// 			resp.end();
// 			console.error('Caught error', err);
// 		} else {
// 			items = items.map((item) => { return { id: item._id, description: item.description } });
// 			resp.json(items);
// 		}
// 	});
// });

// todoRoutes.post('/todo', (req: express.Request, resp: express.Response, next: express.NextFunction) => {
// 	const description = req.body['description'];

// 	const collection: any = getCollection();
// 	collection.insert({ description: description });

// 	resp.end();
// });

// todoRoutes.put('/todo/:id', (req: express.Request, resp: express.Response, next: express.NextFunction) => {
// 	const id = req.params['id'];
// 	const description = req.body['description'];
// 	const collection: any = getCollection();
// 	collection.findOneAndUpdate({ "_id": new mongodb.ObjectId(id) }, { $set: { "description": description } });
// 	resp.end();
// });

// todoRoutes.delete('/todo/:id', (req: express.Request, resp: express.Response, next: express.NextFunction) => {
// 	const id = req.params['id'];
// 	const collection: any = getCollection();
// 	collection.remove({ "_id": new mongodb.ObjectId(id) });

// 	resp.end();
// });

export { todoRoutes }