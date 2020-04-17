import {
  Router
} from 'express';
import RentTransactionController from '../controllers/mysql/rentTransaction';
const router = new Router();

router.route('/')
  .post(RentTransactionController.add);

export default router;