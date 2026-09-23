import express from 'express';
import {
  getVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from '../controllers/vehicleController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getVehicles);
router.post('/', authorize('ADMIN', 'SUPER_VENDOR', 'SUB_VENDOR'), createVehicle);
router.put('/:id', authorize('ADMIN', 'SUPER_VENDOR', 'SUB_VENDOR'), updateVehicle);
router.delete('/:id', authorize('ADMIN', 'SUPER_VENDOR'), deleteVehicle);

export default router;
