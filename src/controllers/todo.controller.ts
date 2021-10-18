import * as express from 'express';
import { TodoModel } from '../model/todo';

const getTodos = async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	try {
		let items: any = await TodoModel.find({});
		items = items.map((item) => { return { id: item._id, description: item.description } });
		resp.json(items);
	} catch (err) {
		resp.status(500);
		resp.end();
		console.error('Caught error', err);
	}
}

const createTodo = async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const description = req.body['description'];
	const todo = new TodoModel({ description: description });
	console.log("create Todo", description);
	await todo.save();
	resp.send({ msg: description });
	resp.end();
}

const updateTodo = async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const description = req.body['description'];
	const id = req.params['id'];
	await TodoModel.findByIdAndUpdate(id, { description: description });
	console.log("update Todo", description);
	resp.send({ msg: description });
	resp.end();
}

const deleteTodo = async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	const id = req.params['id'];
	await TodoModel.findByIdAndRemove(id);
	console.log("delete Todo", id);
	resp.end();
}

export { getTodos, createTodo, updateTodo, deleteTodo };