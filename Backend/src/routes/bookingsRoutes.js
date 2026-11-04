import { Router } from 'express';
import { createBooking, getBookings, getBookingById } from '../controllers/bookingsController.js';
import { uploadReport } from '../middlewares/upload.js';

const router = Router();

router.post('/', uploadReport.single('medicalReport'), createBooking);
router.get('/', getBookings);
router.get('/:id', getBookingById);

export default router;

