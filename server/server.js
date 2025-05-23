import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// you need to add the .js !! 
import connectDB from './configs/db.js';
import 'dotenv/config.js';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';

const app = express();
// tries a port in the .env file first, otherwise uses port 4000
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary();

// the url of our current client. **Allow multiple origins
const allowedOrigins = ['http://localhost:5173'];

// Middleware config so all the data comes in as a json
app.use(express.json());
app.use(cookieParser());
// cors dictates what sources of data are allowed?? 
app.use(cors({origin: allowedOrigins, credentials: true}));

// when we send a request, the working response is below
app.get('/', (req, res) => res.send("API is Working"));

app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)

// start app, look for this console log for positive feedback
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

