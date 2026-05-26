import {Router} from 'express';

import authRoutes from './auth.js';


const router = Router();

router.use('/users', authRoutes);

export default router;