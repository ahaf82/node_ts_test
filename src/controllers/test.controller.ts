import * as express from 'express';
import { EventEmitter } from 'events';
import { Worker } from 'worker_threads';
import emitter from '../loaders/eventEmitter';

const userEmitter = new EventEmitter();

const sendMail = (user: string, mail: string) => {
	console.log(`I am ${user} and send a ${mail}-mail`);
}

const workWithWorker = async (resp) => {
	return new Promise((resolve, reject) => {
		const message = "Hey Dude!";
		const worker = new Worker('./src/worker/workers.js');
		worker.on('error', (err) => {
			reject(resp.send(err));
		});
		worker.on('message', (message) => {
			resolve(resp.send({ msg: "got request", result: message }).end());
		});
		worker.postMessage(message);
	})
}

userEmitter.on('new User', sendMail);

const create = async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	userEmitter.emit("new User", 'Armin', 'B2B');
	emitter.emit('create User');
	workWithWorker(resp);
}

const addOwnListener = async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	userEmitter.emit("add Listener");
	emitter.emit('update User');
	resp.end();
}

const removeOwnListener = async (req: express.Request, resp: express.Response, next: express.NextFunction) => {
	userEmitter.emit("remove Listener");
	emitter.emit('delete User');
	resp.end();
}

// export { getTodos, createTodo, updateTodo, deleteTodo };
export { create, addOwnListener, removeOwnListener, userEmitter };