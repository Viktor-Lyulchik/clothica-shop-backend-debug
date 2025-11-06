import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getAllGoods,
  getGoodById,
  createGood,
  updateGood,
  deleteGood,
} from '../controllers/goodController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/api/goods', ctrlWrapper(getAllGoods));
router.get('/api/goods/:id', ctrlWrapper(getGoodById));
router.post('/api/goods', authenticate, ctrlWrapper(createGood));
router.patch('/api/goods/:id', authenticate, ctrlWrapper(updateGood));
router.delete('/api/goods/:id', authenticate, ctrlWrapper(deleteGood));

export default router;
