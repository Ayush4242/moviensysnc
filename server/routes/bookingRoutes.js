import express from 'express';
import {
  getBookings,
  createBooking,
  updateBooking,
  cancelBooking,
  deleteBooking,
} from '../controllers/bookingController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getBookings);
router.post('/', authorize('ADMIN', 'EMPLOYEE'), createBooking);
router.put('/:id', authorize('ADMIN', 'EMPLOYEE'), updateBooking);
router.put('/:id/cancel', authorize('ADMIN', 'EMPLOYEE'), cancelBooking);
router.delete('/:id', authorize('ADMIN'), deleteBooking);

export default router;
