import {Router} from 'express';

import authRoutes from './auth.js';
import customerRoutes from './customers.js';
import personsRoutes from './persons.js';
import namesRoutes from './names.js';

const router = Router();

router.use('/users', authRoutes);
router.use('/customers', customerRoutes);
router.use('/persons', personsRoutes);
router.use('/names', namesRoutes);

export default router;