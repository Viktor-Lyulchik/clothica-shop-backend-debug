import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/api/categories', ctrlWrapper(getAllCategories));
router.get('/api/categories/:id', ctrlWrapper(getCategoryById));
router.post('/api/categories', authenticate, ctrlWrapper(createCategory));
router.patch('/api/categories/:id', authenticate, ctrlWrapper(updateCategory));
router.delete('/api/categories/:id', authenticate, ctrlWrapper(deleteCategory));

export default router;
