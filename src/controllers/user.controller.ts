import { Request, Response } from 'express';
import User, { IUser } from '../model/user';
import * as jwt from 'jsonwebtoken';
import * as config from '../config/config';

function createToken(user: IUser) {
	return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
		expiresIn: 86400
	});
}

export const register = async (req: Request, res: Response): Promise<Response> => {
	if (!req.body.email || !req.body.password) {
		return res.status(400).json({ msg: 'Bitte alle Felder ausfüllen.' });
	}
	const user = await User.findOne({ email: req.body.email });
	if (user) {
		return res.status(400).json({ msg: 'Der Nutzer existiert bereits.' });
	}

	const newUser = new User(req.body);
	await newUser.save();

	return res.status(201).json(newUser);
}

export const login = async (req: Request, res: Response): Promise<Response> => {
	if (!req.body.email || !req.body.password) {
		return res.status(400).json({ msg: 'Bitte alle Felder ausfüllen' });
	}

	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return res.status(400).json({ msg: 'Nutzer existiert nicht.' });
	}

	const isMatch = await user.comparePassword(req.body.password);

	if (isMatch) {
		return res.status(200).json({ token: createToken(user) });
	}

	return res.status(400).json({ msg: 'Die eingegebenen Daten konnten keinem Nutzer zugeordnet werden' });
}