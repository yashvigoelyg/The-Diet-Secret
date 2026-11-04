import { Router } from 'express';
import { getDietitians, getDietitianById, getAvailableSlots } from '../controllers/dietitiansController.js';

const router = Router();

router.get('/', getDietitians);
router.get('/:id', getDietitianById);
router.get('/:id/slots', getAvailableSlots);

export default router;

