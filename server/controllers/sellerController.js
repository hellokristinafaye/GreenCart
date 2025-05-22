import jwt from 'jsonwebtoken';

// Login Seller : /api/seller/login
export const sellerLogin = async (req, res) => {
   try {
       const { email, password } = req.body;

       if (password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL) {
           // creates token if email and password match
           const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });

           res.cookie('sellerToken', token, {
               httpOnly: true, 
               secure: process.env.NODE_ENV === 'production', 
               sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', 
               maxAge: 7 * 24 * 60 * 60 * 1000, 
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
        return res.json({ success: true, message: "why don't we need a cookie here?" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


// Logout Seller : /api/seller/logout
export const sellerLogout = async (req, res) => {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({ success: true, message: "Logged Out - Seller" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// OK tested out these routes and they work great! you do have to submit the req in a json just like the user. Not sure why we don't need a register route for sellers, or why we don't need cookies for them?? Like wouldn't we wanna apply the same thing to a Seller account vs a User account?? 