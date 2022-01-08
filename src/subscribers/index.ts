
import createUser from "./create_user";
import deleteUser from "./delete_user";
import updateUser from "./update_user";

export default function loadListeners(emitter) {

	emitter.on('create User', createUser);
	emitter.on('update User', updateUser);
	emitter.on('delete User', deleteUser);

	return emitter;
}