import express from 'express';
import {
  getVendors,
  createVendor,
  updateVendor,
  moveVendor,
  toggleDelegation,
  deleteVendor,
} from '../controllers/vendorController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getVendors);
router.post('/', authorize('ADMIN', 'SUPER_VENDOR'), createVendor);
router.put('/:id', authorize('ADMIN', 'SUPER_VENDOR'), updateVendor);
router.put('/:id/move', authorize('ADMIN', 'SUPER_VENDOR'), moveVendor);
router.put('/:id/delegation', authorize('ADMIN', 'SUPER_VENDOR'), toggleDelegation);
router.delete('/:id', authorize('ADMIN', 'SUPER_VENDOR'), deleteVendor);

export default router;
