import { Router } from 'express';
import plansRoutes from './plansRoutes.js';
import dietitiansRoutes from './dietitiansRoutes.js';
import bookingsRoutes from './bookingsRoutes.js';
import checkoutRoutes from './checkoutRoutes.js';
import dashboardRoutes from './dashboardRoutes.js';
import foodsRoutes from './foodsRoutes.js';
import toolsRoutes from './toolsRoutes.js';
import intakeRoutes from './intakeRoutes.js';

const router = Router();

router.use('/plans', plansRoutes);
router.use('/dietitians', dietitiansRoutes);
router.use('/bookings', bookingsRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/foods', foodsRoutes);
router.use('/tools', toolsRoutes);
router.use('/intake', intakeRoutes);

export default router;

