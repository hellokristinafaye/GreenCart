import express from 'express';
import { upload} from '../configs/multer.js'
import authSeller from '../middlewares/authSeller.js';

const productRouter = express.Router();

productRouter.post('/add', upload.array([images]), authSeller);

