import { Joi, Segments } from 'celebrate';
import { ORDER_STATUS } from '../constants/orderStatuses.js';

export const createOrderSchema = {
  [Segments.BODY]: Joi.object({
    goods: Joi.array()
      .items(
        Joi.object({
          goodId: Joi.string().required(),
          amount: Joi.number().min(1).required(),
          size: Joi.string().required(),
        })
      )
      .min(1)
      .required(),
    sum: Joi.number().min(1).required(),
    date: Joi.string().required(),
    userName: Joi.string().required(),
    userLastName: Joi.string().required(),
    userPhone: Joi.string().required(),
    branchnum_np: Joi.string().required(),
  }),
};

export const updateStatusSchema = {
  [Segments.BODY]: Joi.object({
    status: Joi.string().valid(...Object.values(ORDER_STATUS)).required(),
  }),
};
