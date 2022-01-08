import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as config from '../config/config';

const auth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        next();
    } catch (err) {
        res.status(401).json({ mdg: 'Token not valid' });
    }
}

export { auth };