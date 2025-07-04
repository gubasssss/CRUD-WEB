import { Router } from 'express';
import { createUser, recoverPassword, updateCurrentUser, verifyUsername } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
router.post('/users', authMiddleware, createUser);
router.put('/users/me', authMiddleware, updateCurrentUser);
router.post('/users/recover-password', recoverPassword);
router.post('/users/verify-username', verifyUsername);





export default router;