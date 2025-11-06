import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/api/orders', authenticate, ctrlWrapper(getAllOrders));
router.get('/api/orders/:id', authenticate, ctrlWrapper(getOrderById));
router.post('/api/orders', authenticate, ctrlWrapper(createOrder));
router.patch('/api/orders/:id', authenticate, ctrlWrapper(updateOrder));
router.delete('/api/orders/:id', authenticate, ctrlWrapper(deleteOrder));

export default router;
