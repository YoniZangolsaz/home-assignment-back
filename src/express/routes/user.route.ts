import * as express from 'express';
import { wrapController } from '../utils/wraps';
import * as userController from '../controllers/user.controller';

const userRouter = express.Router();

// sing in
userRouter.post('/login', wrapController(userController.login));

// create
userRouter.post('', wrapController(userController.createUser));

export default userRouter;
