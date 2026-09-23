import express from 'express';
import {
  getVisitors,
  getVisitorById,
  createVisitor,
  updateVisitor,
  deleteVisitor,
  approveVisitor,
  rejectVisitor,
  checkInVisitor,
  checkOutVisitor,
} from '../controllers/visitorController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getVisitors);
router.get('/:id', getVisitorById);
router.post('/', authorize('ADMIN', 'EMPLOYEE'), createVisitor);
router.put('/:id', authorize('ADMIN', 'EMPLOYEE'), updateVisitor);
router.delete('/:id', authorize('ADMIN'), deleteVisitor);

router.put('/:id/approve', authorize('ADMIN', 'EMPLOYEE'), approveVisitor);
router.put('/:id/reject', authorize('ADMIN', 'EMPLOYEE'), rejectVisitor);
router.put('/:id/check-in', authorize('ADMIN', 'SECURITY'), checkInVisitor);
router.put('/:id/check-out', authorize('ADMIN', 'SECURITY'), checkOutVisitor);

export default router;
