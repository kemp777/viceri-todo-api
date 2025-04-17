// src/server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';

import routes from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api', routes);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
