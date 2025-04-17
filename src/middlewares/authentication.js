import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.js';

export default function authenticate(req, res, next) {
	const authHeader = req.headers.authorization;
	const token = authHeader?.split(' ')[1];

	if (!token) return res.status(401).json({ error: 'Token não fornecido.' });

	jwt.verify(token, jwtConfig.secret, (err, decoded) => {
		if (err) return res.status(403).json({ error: 'Token inválido.' });

		req.userId = decoded.userId;
		next();
	});
}
