import authMiddleWare from '../middleware/middleware.js';
import { getAllTaskController, getTaskByAssignedUserIdController, createTaskController, updateTaskController, deleteTaskController, getTaskByAuthorIdController } from '../controllers/task_controller.js';
import express from 'express';

const router = express.Router();

router.get('/', authMiddleWare, getAllTaskController);
router.get('/assigned/:id', authMiddleWare, getTaskByAssignedUserIdController);
router.get('/authored/:id', authMiddleWare, getTaskByAuthorIdController);
router.post('/', authMiddleWare, createTaskController);
router.put('/:id', authMiddleWare, updateTaskController);
router.delete('/:id', authMiddleWare, deleteTaskController);
 
export {router as TaskRoutes }