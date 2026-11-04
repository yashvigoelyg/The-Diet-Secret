import { Router } from 'express';
import {
  getDashboardOverview,
  logWater,
  logFoodMeal,
  confirmMealStatus,
  getAdherenceAnalytics,
  getWeightTrajectory,
  getDietitianNotes
} from '../controllers/dashboardController.js';

const router = Router();

router.get('/overview', getDashboardOverview);
router.post('/log-water', logWater);
router.post('/log-meal', logFoodMeal);
router.patch('/meals/:mealId/confirm', confirmMealStatus);
router.get('/analytics/weekly-adherence', getAdherenceAnalytics);
router.get('/analytics/weight-trajectory', getWeightTrajectory);
router.get('/dietitian-notes', getDietitianNotes);

export default router;

