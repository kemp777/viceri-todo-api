import request from 'supertest';
import app from '../src/server.js';

describe('Auth Endpoints', () => {
	const testEmail = `test_${Date.now()}@example.com`;
	const password = '123456';

	it('deve registrar um novo usuário', async () => {
		const res = await request(app).post('/api/auth/register').send({
			name: 'Tester',
			email: testEmail,
			password,
		});

		expect(res.statusCode).toBe(201);
		expect(res.body).toHaveProperty('id');
		expect(res.body).toHaveProperty('email', testEmail);
	});

	it('deve logar com credenciais válidas', async () => {
		const res = await request(app).post('/api/auth/login').send({
			email: testEmail,
			password,
		});

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('token');
	});

	it('deve falhar ao logar com senha incorreta', async () => {
		const res = await request(app).post('/api/auth/login').send({
			email: testEmail,
			password: 'errada',
		});

		expect(res.statusCode).toBe(401);
		expect(res.body).toHaveProperty('error');
	});
});
