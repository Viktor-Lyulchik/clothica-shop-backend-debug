import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  createFeedback,
  getAllFeedbacks,
} from '../controllers/feedbackController.js';
import {
  createFeedbackSchema,
  getAllFeedbacksSchema,
} from '../validations/feedbacksValidation.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/feedbacks',
  celebrate(createFeedbackSchema),
  ctrlWrapper(createFeedback),
);
router.get(
  '/feedbacks',
  celebrate(getAllFeedbacksSchema),
  ctrlWrapper(getAllFeedbacks),
);

export default router;
