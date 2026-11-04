import { Router } from 'express';
import { getIndianFoods, addIndianFood } from '../controllers/foodsController.js';

const router = Router();

router.get('/', getIndianFoods);
router.post('/', addIndianFood);

export default router;

