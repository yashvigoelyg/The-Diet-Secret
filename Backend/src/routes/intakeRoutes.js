import { Router } from 'express';
import { submitIntake } from '../controllers/intakeController.js';
import { uploadReport } from '../middlewares/upload.js';

const router = Router();

router.post('/', uploadReport.single('pastMedicalReports'), submitIntake);

export default router;

