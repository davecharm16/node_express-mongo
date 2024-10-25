import { loginInController, signInController } from '../controllers/auth_controller.js';
import express, { Router } from 'express';

const router: Router = express.Router();

router.post('/logIn', loginInController);
router.post('/signIn', signInController);


export {router as authRoutes}