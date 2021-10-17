import { app } from './app';
import * as http from 'http';
import { MongoHelper } from './mongo.helper';
import * as mongoose from 'mongoose';


const port = 8080;
const server = http.createServer(app);

server.listen(port);
server.on('error', (err) => {
	console.error(err);
});
const MONGO_URI = "mongodb+srv://Guest:GuestSession@cluster0.wucbb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
server.on('listening', async () => {
	console.info(`Listening on port ${port}`);
	mongoose.connect(MONGO_URI, {});
	mongoose.connection.once('open', () => {
		console.info('Connected to Mongo via Mongoose');
	});
	mongoose.connection.on('error', (err) => {
		console.error('Unable to connect to Mongo via Mongoose', err);
	});
});

export default server;