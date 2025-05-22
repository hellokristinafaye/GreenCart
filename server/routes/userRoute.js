import express from 'express';
import { register } from '../controllers/userController.js';
// this is a userRouter
const userRouter = express.Router();

userRouter.post('/register', register);

export default userRouter;