import express from 'express';
import { upload} from '../configs/multer.js'

const productRouter = express.Router();

productRouter.post('/add', upload)
