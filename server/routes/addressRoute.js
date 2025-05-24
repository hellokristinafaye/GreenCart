import express from 'express';
import authUser from '../middlewares/authUser';
import { addAddress } from '../controllers/addressController';

const addressRouter = express.Router();

addressRouter.post('/add', authUser, addAddress);