import authMiddleWare from '../middleware/middleware.js';
import { loginInController, logOutAll, logOutController, signInController } from '../controllers/auth_controller.js';
import express, { Router, } from 'express';

const router: Router = express.Router();


router.post('/logIn', loginInController);
router.post('/signIn', signInController);
router.post('/logOut', authMiddleWare, logOutController);
router.post('/logOutAll', authMiddleWare, logOutAll);

export {router as AuthRoutes}