// basic Express App
import express from 'express';

const app = express();
// tries a port in the .env file first, otherwise uses port 4000
const port = process.env.PORT || 4000;
// when we send a request, the working response is below
app.get('/', (req, res) => response.send("API is Working"));