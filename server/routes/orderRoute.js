import express from 'express';
import authUser from '../middlewares/authUser.js';
import { placeOrderCOD } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/cod', authUser, placeOrderCOD);
