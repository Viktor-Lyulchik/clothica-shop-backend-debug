import { Router } from 'express';
import { celebrate } from 'celebrate';
import { createFeedback, getAllFeedbacks,  } from '../controllers/feedbackController.js';
import { createFeedbackSchema, getAllFeedbacksSchema, } from '../validations/feedbackValidation.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();


router.post('/api/feedbacks', celebrate(createFeedbackSchema), ctrlWrapper(createFeedback));
router.get('/api/feedbacks', celebrate(getAllFeedbacksSchema),  ctrlWrapper(getAllFeedbacks));

export default router;
