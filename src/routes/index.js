import { Router } from 'express';
import authentication from './authentication.js';
import task from './task.js';

const router = Router();

router.use('/auth', authentication);
router.use('/tasks', task);

export default router;
