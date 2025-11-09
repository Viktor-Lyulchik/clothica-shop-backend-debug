import { Router } from 'express';
import { celebrate } from 'celebrate';
import { createSubscriptionSchema } from '../validations/subscriptionsValidation.js';
import { createSubscription } from '../controllers/subscriptionController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/subscriptions',
  celebrate(createSubscriptionSchema),
  ctrlWrapper(createSubscription),
);

export default router;
