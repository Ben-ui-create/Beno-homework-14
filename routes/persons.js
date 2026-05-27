import {Router} from 'express';

import controller from '../controllers/persons.js';

import authorization from "../middlewares/authorization.js";
import validation from '../middlewares/validation.js';
import personsSchema from '../middlewares/schemas/persons.schema.js';

const router = new Router();

router.post(
  '/',
  authorization,
  validation(personsSchema.create, 'body'),
  controller.create,
);

router.get(
  '/',
  authorization,
  controller.getAll,
);

router.put(
  '/:id',
  authorization,
  validation(personsSchema.idParam, 'params'),
  validation(personsSchema.update, 'body'),
  controller.update,
);

router.delete(
  '/:id',
  authorization,
  validation(personsSchema.idParam, 'params'),
  controller.deletePerson,
);

export default router;