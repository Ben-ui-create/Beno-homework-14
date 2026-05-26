import Joi from 'joi';

export default {
  create: Joi.object({
    FirstName: Joi.string()
      .min(2)
      .max(50)
      .required(),

    LastName: Joi.string()
      .min(2)
      .max(50)
      .required(),
  }),

  update: Joi.object({
    FirstName: Joi.string()
      .min(2)
      .max(50)
      .required(),

    LastName: Joi.string()
      .min(2)
      .max(50)
      .required(),
  }),

  idParam: Joi.object({
    id: Joi.number()
      .integer()
      .positive()
      .required(),
  }),
};