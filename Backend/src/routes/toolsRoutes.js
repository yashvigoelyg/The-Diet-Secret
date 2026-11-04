import { Router } from 'express';
import { calculateBmi, getRecipes, getTransformations } from '../controllers/toolsController.js';

const router = Router();

router.post('/bmi-calculate', calculateBmi);
router.get('/recipes', getRecipes);
router.get('/transformations', getTransformations);

export default router;

