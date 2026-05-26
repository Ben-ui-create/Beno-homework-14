import {Router} from 'express';

import authorization from "../middlewares/authorization.js";
import controller from '../controllers/names.js';

const router = Router();

router.get(
  '/unique',
  authorization,
  controller.getUnique,
);

router.get(
  '/all',
  authorization,
  controller.getAll,
);

router.get(
  '/by-last',
  authorization,
  controller.getByLast,
);

export default router;