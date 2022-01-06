import * as express from 'express';
// import { TodoModel } from '../model/todo';

// const getTodos = async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
// 	try {
// 		let items: any = await TodoModel.find({});
// 		items = items.map((item) => { return { id: item._id, description: item.description } });
// 		resp.json(items);
// 	} catch (err) {
// 		resp.status(500);
// 		resp.end();
// 		console.error('Caught error', err);
// 	}
// }

const create = async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	console.log("request in server");
	resp.send({ msg: "got request" });
	resp.end();
}

// const updateTodo = async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
// 	const description = req.body['description'];
// 	const id = req.params['id'];
// 	await TodoModel.findByIdAndUpdate(id, { description: description });
// 	console.log("update Todo", description);
// 	resp.send({ msg: description });
// 	resp.end();
// }

// const deleteTodo = async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
// 	const id = req.params['id'];
// 	await TodoModel.findByIdAndRemove(id);
// 	console.log("delete Todo", id);
// 	resp.end();
// }

// export { getTodos, createTodo, updateTodo, deleteTodo };
export { create };