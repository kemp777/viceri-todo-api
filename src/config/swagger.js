import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
	openapi: '3.0.0',
	info: {
		title: 'TODO API',
		version: '1.0.0',
		description: 'Documentação da API REST de tarefas com autenticação JWT',
		contact: {
			name: 'Thiago Kemp',
			url: 'https://github.com/kemp777',
			email: 'thiagokemp@exemplo.com'
		}
	},
	servers: [
		{
			url: 'http://localhost:3000/api',
			description: 'Servidor local'
		}
	],
	tags: [
		{
			name: 'Auth',
			description: 'Endpoints de autenticação'
		},
		{
			name: 'Tasks',
			description: 'Gerenciamento de tarefas'
		}
	],
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT'
			}
		},
		schemas: {
			Task: {
				type: 'object',
				properties: {
					id: { type: 'string', example: 'uuid-task-id' },
					description: { type: 'string', example: 'Lavar a louça' },
					priority: { type: 'string', enum: ['Alta', 'Média', 'Baixa'], example: 'Alta' },
					completed: { type: 'boolean', example: false },
					createdAt: { type: 'string', format: 'date-time' }
				}
			},
			User: {
				type: 'object',
				properties: {
					id: { type: 'string', example: 'uuid-user-id' },
					name: { type: 'string', example: 'Thiago' },
					email: { type: 'string', example: 'thiago@example.com' },
					createdAt: { type: 'string', format: 'date-time' }
				}
			},
			AuthRequest: {
				type: 'object',
				required: ['email', 'password'],
				properties: {
					email: { type: 'string', example: 'thiago@example.com' },
					password: { type: 'string', example: '123456' }
				}
			},
			RegisterRequest: {
				type: 'object',
				required: ['name', 'email', 'password'],
				properties: {
					name: { type: 'string', example: 'Thiago' },
					email: { type: 'string', example: 'thiago@example.com' },
					password: { type: 'string', example: '123456' }
				}
			},
			AuthResponse: {
				type: 'object',
				properties: {
					token: { type: 'string', example: 'jwt.token.aqui' }
				}
			},
			ErrorResponse: {
				type: 'object',
				properties: {
					error: { type: 'string', example: 'Credenciais inválidas' }
				}
			}
		}
	},
	security: [
		{
			bearerAuth: []
		}
	]
};

const options = {
	swaggerDefinition,
	apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
