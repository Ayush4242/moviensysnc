import express from 'express';
import {
  getRoutes,
  createRoute,
  updateRoute,
  deleteRoute,
} from '../controllers/routeController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getRoutes);
router.post('/', authorize('ADMIN', 'EMPLOYEE'), createRoute);
router.put('/:id', authorize('ADMIN', 'EMPLOYEE'), updateRoute);
router.delete('/:id', authorize('ADMIN'), deleteRoute);

export default router;
