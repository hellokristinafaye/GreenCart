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
            return res.json({ success: false, message: 'Not Authorized' });
        }
    } catch (error) {
        
    }
}