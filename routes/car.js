import {
  Router
} from 'express';
import CarController from '../controllers/mysql/car';
const router = new Router();

router.route('/')
  .get(CarController.getAll)
  .post(CarController.add);

router.route('/:id')
  .get(CarController.getById)
  .put(CarController.update)
  .delete(CarController.remove);

export default router;