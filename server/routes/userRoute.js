import express from 'express';
import { register } from '../controllers/userController';
// this is a userRouter
const userRouter = express.Router();

userRouter.post('/register', register);