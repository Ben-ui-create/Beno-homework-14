import {Router} from 'express';

import controller from '../controllers/auth.js';

import validation from '../middlewares/validation.js';
import schema from '../middlewares/schemas/auth.schema.js';

const router = Router();

router.post(
  '/register',
  validation(schema.register, 'body'),
  controller.register,
);

router.post(
  '/login',
  validation(schema.login, 'body'),
  controller.login,
);

router.post(
  '/logout',
  controller.logout,
);

router.get(
  '/me',
  controller.me,
);

export default router;
