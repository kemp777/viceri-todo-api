import request from 'supertest';
import app from '../src/server.js';

describe('Task Endpoints', () => {
	let token;
	const testEmail = `task_${Date.now()}@example.com`;
	const password = '123456';

	beforeAll(async () => {
		await request(app).post('/api/auth/register').send({
			name: 'Task Tester',
			email: testEmail,
			password,
		});

		const login = await request(app).post('/api/auth/login').send({
			email: testEmail,
			password,
		});

		token = login.body.token;
	});

	it('deve criar uma tarefa para o usuário autenticado', async () => {
		const res = await request(app)
			.post('/api/tasks')
			.set('Authorization', `Bearer ${token}`)
			.send({
				description: 'Finalizar testes',
				priority: 'Alta',
			});

		expect(res.statusCode).toBe(201);
		expect(res.body).toHaveProperty('id');
		expect(res.body.description).toBe('Finalizar testes');
	});

	it('deve retornar as tarefas pendentes do usuário', async () => {
		const res = await request(app)
			.get('/api/tasks')
			.set('Authorization', `Bearer ${token}`);

		expect(res.statusCode).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body.length).toBeGreaterThanOrEqual(1);
	});

	it('deve bloquear acesso sem token', async () => {
		const res = await request(app).get('/api/tasks');
		expect(res.statusCode).toBe(401);
		expect(res.body).toHaveProperty('error');
	});
});
