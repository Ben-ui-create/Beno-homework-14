import {Router} from 'express';

import authRoutes from './auth.js';
import customerRoutes from './customers.js';


const router = Router();

router.use('/users', authRoutes);
router.use('/customers', customerRoutes);

export default router;