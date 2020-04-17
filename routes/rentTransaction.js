import {
  Router
} from 'express';
import RentTransactionController from '../controllers/rentTransaction';
const router = new Router();

router.route('/')
  .post(RentTransactionController.add);

export default router;