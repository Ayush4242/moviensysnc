import express from 'express';
import {
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from '../controllers/scheduleController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getSchedules);
router.post('/', authorize('ADMIN', 'SUPER_VENDOR', 'SUB_VENDOR'), createSchedule);
router.put('/:id', authorize('ADMIN', 'SUPER_VENDOR', 'SUB_VENDOR'), updateSchedule);
router.delete('/:id', authorize('ADMIN', 'SUPER_VENDOR'), deleteSchedule);

export default router;
