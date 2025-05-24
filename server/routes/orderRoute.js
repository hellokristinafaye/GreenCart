import express from 'express';
import authUser from '../middlewares/authUser.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser)