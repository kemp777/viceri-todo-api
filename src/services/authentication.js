import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import jwtConfig from '../config/jwt.js';

const prisma = new PrismaClient();

export async function register({ name, email, password }) {
	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) throw new Error('E-mail já cadastrado.');

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: { name, email, password: hashedPassword },
	});

	return {
		id: user.id,
		name: user.name,
		email: user.email,
		createdAt: user.createdAt,
	};
}

export async function login({ email, password }) {
	const user = await prisma.user.findUnique({ where: { email } });
	if (!user) throw new Error('Credenciais inválidas.');

	const passwordValid = await bcrypt.compare(password, user.password);
	if (!passwordValid) throw new Error('Credenciais inválidas.');

	const token = jwt.sign({ userId: user.id }, jwtConfig.secret, {
		expiresIn: jwtConfig.expiresIn,
	});

	return { token };
}
