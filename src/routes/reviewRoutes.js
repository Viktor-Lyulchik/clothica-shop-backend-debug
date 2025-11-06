import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getAllReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview,
} from '../controllers/reviewController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/api/reviews', ctrlWrapper(getAllReviews));
router.get('/api/reviews/:id', ctrlWrapper(getReviewById));
router.post('/api/reviews', authenticate, ctrlWrapper(createReview));
router.patch('/api/reviews/:id', authenticate, ctrlWrapper(updateReview));
router.delete('/api/reviews/:id', authenticate, ctrlWrapper(deleteReview));

export default router;
