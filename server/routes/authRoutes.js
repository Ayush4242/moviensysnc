import express from 'express';
import { loginUser, getMe, getUsers } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.get('/users', protect, getUsers);

export default router;
