

import express from 'express';
import { isSellerAuth, sellerLogin } from '../controllers/sellerController.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/is-auth', isSellerAuth);
