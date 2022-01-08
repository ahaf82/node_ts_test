const { parentPort } = require('worker_threads');

async function workNowSucker(message) {
	console.log("parameter data from parent", message);
	setTimeout(() => {
		parentPort.postMessage("I'm ready Sucker");
	}, 1000)
}

parentPort.on("message", message => {
	workNowSucker(message);
});
