import express from 'express';
import { UserController } from '../controllers/userController';

const router = express.Router();
const userController = new UserController();

router.route('/all').get(userController.getAllUsers);
router.route('/').post(userController.createUser);
router.route('/:email')
  .get(userController.getUserByEmail)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

export default router;