import { register as registerService, login as loginService } from '../services/authentication.js';

export async function register(req, res) {
	try {
		const user = await registerService(req.body);
		res.status(201).json(user);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}

export async function login(req, res) {
	try {
		const result = await loginService(req.body);
		res.status(200).json(result);
	} catch (err) {
		res.status(401).json({ error: err.message });
	}
}
