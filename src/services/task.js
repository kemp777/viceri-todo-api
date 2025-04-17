import { PrismaClient } from '@prisma/client';
import res from "express/lib/response.js";

const prisma = new PrismaClient();

export async function createTask(userId, { description, priority }) {
	return prisma.task.create({
		data: {
			description,
			priority,
			userId,
		},
	});
}

export async function listPendingTasks(userId) {
	return prisma.task.findMany({
		where: {
			userId,
			completed: false,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
}

export async function markTaskAsDone(userId, taskId) {
	return prisma.task.update({
		where: {
			id: taskId,
			userId
		},
		data: {
			completed: true
		}
	});
}