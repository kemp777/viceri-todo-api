import prisma from "@prisma/client";
import { createTask, listPendingTasks, markTaskAsDone } from '../services/task.js';

export async function create(req, res) {
	try {
		const task = await createTask(req.userId, req.body);
		res.status(201).json(task);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}

export async function list(req, res) {
	try {
		const tasks = await listPendingTasks(req.userId);
		res.json(tasks);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export async function markAsDone(req, res) {
	try {
		const task = await markTaskAsDone(req.userId, req.params.id);
		res.json(task);
	} catch (err) {
		res.status(404).json({ error: err.message });
	}
}
