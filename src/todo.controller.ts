import * as express from 'express';
import * as mongodb from 'mongodb';
import { MongoHelper } from './mongo.helper';
import { TodoModel } from './todo';

const todoRoutes = express.Router();

const getCollection = () => {
	return MongoHelper.client.db('todo').collection('todos');
}

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

todoRoutes.get('/todo', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	try {
		let items: any = await TodoModel.find({});
		items = items.map((item) => { return { id: item._id, description: item.description } });
		resp.json(items);
	} catch (err) {
		resp.status(500);
		resp.end();
		console.error('Caught error', err);
	}
});

todoRoutes.post('/todo', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const description = req.body['description'];
	const todo = new TodoModel({ description: description });
	await todo.save();
	resp.end();
});

todoRoutes.put('/todo/:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const description = req.body['description'];
	const id = req.params['id'];
	await TodoModel.findByIdAndUpdate(id, { description: description });

	resp.end();
});

todoRoutes.delete('/todo/:id', async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const id = req.params['id'];

	await TodoModel.findByIdAndRemove(id);
	resp.end();
});


export { todoRoutes }