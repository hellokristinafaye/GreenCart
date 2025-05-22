import express from 'express';
import { login, register } from '../controllers/userController.js';
// this is a userRouter
const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);

export default userRouter;