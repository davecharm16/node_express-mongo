import authMiddleWare from '../middleware/middleware.js';
import { getAllTaskController, getTaskByIdController, createTaskController, updateTaskController, deleteTaskController } from '../controllers/task_controller.js';
import express from 'express';

const router = express.Router();

router.get('/', authMiddleWare, getAllTaskController);
router.get('/:id', authMiddleWare, getTaskByIdController);
router.post('/create', authMiddleWare, createTaskController);
router.put('/:id', authMiddleWare, updateTaskController);
router.delete('/:id', authMiddleWare, deleteTaskController);
 
export {router as TaskRoutes }