import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized' });
    }

    try {
        // verifies the token w/ the secret
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
            // if the token IS good and available, assign userId in the req.body to it
            req.body.userId = tokenDecode.id
        } else {
            // if the token is either unmatching or not there, block them with this msg
            return res.json({ success: false, message: 'Not Authorized' });
        }
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}