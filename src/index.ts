import { app } from './app';
import * as http from 'http';
import { MongoHelper } from './db/mongo.helper'; // not used while mongoose in use
import * as mongoose from 'mongoose';
const dotenv = require('dotenv')
dotenv.config()

const port = 8080;
const server = http.createServer(app);

server.listen(port);
server.on('error', (err) => {
	console.error(err);
});

server.on('listening', async () => {
	console.info(`Listening on port ${port}`);
	mongoose.connect(process.env.MONGO_URI, {});
	mongoose.connection.once('open', () => {
		console.info('Connected to Mongo via Mongoose');
	});
	mongoose.connection.on('error', (err) => {
		console.error('Unable to connect to Mongo via Mongoose', err);
	});
});

export default server;