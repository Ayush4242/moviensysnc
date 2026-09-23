import express from 'express';
import {
  getDrivers,
  createDriver,
  updateDriver,
  deleteDriver,
} from '../controllers/driverController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getDrivers);
router.post('/', authorize('ADMIN', 'SUPER_VENDOR', 'SUB_VENDOR'), createDriver);
router.put('/:id', authorize('ADMIN', 'SUPER_VENDOR', 'SUB_VENDOR'), updateDriver);
router.delete('/:id', authorize('ADMIN', 'SUPER_VENDOR'), deleteDriver);

export default router;
