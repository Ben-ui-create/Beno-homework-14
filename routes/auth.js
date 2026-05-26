import {Router} from 'express';

import controller from '../controllers/auth.js';

import authorization from "../middlewares/authorization.js";
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
  authorization,
  controller.logout,
);

router.get(
  '/me',
  authorization,
  controller.me,
);

export default router;
