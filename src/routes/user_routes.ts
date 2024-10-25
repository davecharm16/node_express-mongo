import express, { Router } from 'express';
import { getUserController, getUsersController } from '../controllers/user_controller.js';
import authMiddleWare from '../middleware/middleware.js';

const router: Router = express.Router();

router.get('/',authMiddleWare, getUsersController);
router.get('/:id', authMiddleWare,getUserController);


export {router as userRoutes}