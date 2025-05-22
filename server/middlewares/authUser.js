import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized' });
    }

    try {
        // verifies the token w/ the secret
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(`tokenDecode.id: ${tokenDecode.id}`);
        // OK!! This tip was found on Stack Overflow and I *THINK* it's the right move?? either setting req.body to an empty object OR submitting an empty object as a req on Postman.  What a weird magical solve?? It doesn't exactly match the tutorial but it does produce the correct result.. and feels scalable. (5/22/25 1:20pm) Gonna remove all my messy work now. 
        req.body = {}

        if (tokenDecode.id) {
            // if the token IS good and available, assign userId in the req.body to it
            req.body.userId = tokenDecode.id;
        } else {
            // if the token is either unmatching or not there, block them with this msg
            return res.json({ success: false, message: 'Not Authorized' });
        }
        next();
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });    }
}

export default authUser;