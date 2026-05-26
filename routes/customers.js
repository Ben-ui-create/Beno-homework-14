import {Router} from 'express';

import controller from '../controllers/customers.js';

import authorization from "../middlewares/authorization.js";
import validation from '../middlewares/validation.js';
import schema from '../middlewares/schemas/customers.schema.js';

const router = new Router();

router.post(
  '/',
  authorization,
  validation(schema.create, 'body'),
  controller.create,
);

router.get(
  '/',
  authorization,
  controller.getAll,
);

router.get(
  '/same-city',
  authorization,
  controller.getSameCity,
);

router.delete(
  '/:id',
  authorization,
  validation(schema.idParam, 'params'),
  controller.deleteCustomer,
);

export default router;