import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getProfile,
  updateProfile,
  deleteProfile,
} from '../controllers/userController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/api/users/profile', authenticate, ctrlWrapper(getProfile));
router.patch('/api/users/profile', authenticate, ctrlWrapper(updateProfile));
router.delete('/api/users/profile', authenticate, ctrlWrapper(deleteProfile));

export default router;
