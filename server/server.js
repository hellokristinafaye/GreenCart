import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// you need to add the .js !! 
import connectDB from './configs/db.js';
import 'dotenv/config';

const app = express();
// tries a port in the .env file first, otherwise uses port 4000
const port = process.env.PORT || 4000;

await connectDB();

// the url of our current client. **Allow multiple origins
const allowedOrigins = ['http://localhost:5173'];

// Middleware config so all the data comes in as a json
app.use(express.json());
app.use(cookieParser());
// cors dictates what sources of data are allowed?? 
app.use(cors({origin: allowedOrigins, credentials: true}));

// when we send a request, the working response is below
app.get('/', (req, res) => res.send("API is Working"));
// start app, look for this console log for positive feedback
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

