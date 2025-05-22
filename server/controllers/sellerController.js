import jwt from 'jsonwebtoken';

// Login Seller : /api/seller/login
export const sellerLogin = async (req, res) => {
   try {
       const { email, password } = req.body;

       if (password === process.env.SELLER_PASSWORD && email === SELLER_EMAIL) {
           // creates token if email and password match
           const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

           res.cookie('sellerToken', token, {
               httpOnly: true, //Prevents JS from accessing cookie
               secure: process.env.NODE_ENV === 'production', // use secure cookies in production
               sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
               maxAge: 7 * 24 * 60 * 60 * 1000, //Cookie expiration time (7days in miliseconds)
           });

           return res.json({ success: true, message: "Logged In - Seller" });
       } else {
           return res.json({ success: false, message: "Invalid Credentials - Seller" });
       }
   } catch (error) {
       console.log(error.message);
       res.json({ success: false, message: error.message });
   }
}

// Seller isAuth : /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
    try {
        return res.json({ success: true })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// Logout Seller : /api/seller/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}