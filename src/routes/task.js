import { Router } from 'express';
import { create, list, markAsDone } from '../controllers/task.js';
import authenticate from '../middlewares/authentication.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Cria uma nova tarefa
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *               - priority
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Estudar Swagger"
 *               priority:
 *                 type: string
 *                 enum: [Alta, Média, Baixa]
 *                 example: Alta
 *     responses:
 *       201:
 *         description: Tarefa criada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Erro ao criar tarefa
 *       401:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', create);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Lista todas as tarefas pendentes do usuário autenticado
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tarefas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *       401:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', list);

/**
 * @swagger
 * /tasks/{id}/done:
 *   patch:
 *     summary: Marca uma tarefa como concluída
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da tarefa a ser marcada como concluída
 *     responses:
 *       200:
 *         description: Tarefa atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       401:
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Tarefa não encontrada
 */
router.patch('/:id/done', markAsDone);

export default router;
