import express from 'express';

const app = express();
// tries a port in the .env file first, otherwise uses port 4000
const port = process.env.PORT || 4000;
// when we send a request, the working response is below
app.get('/', (req, res) => res.send("API is Working"));
// start app, look for this console log for positive feedback
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
