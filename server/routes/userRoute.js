import express from 'express';
import { isAuth, login, register } from '../controllers/userController.js';
// this is a userRouter
const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/is-auth', isAuth);


export default userRouter;