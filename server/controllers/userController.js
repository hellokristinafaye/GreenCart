import User from "../models/user.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";


// Register User : /api/user/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({success: false, message: 'Missing Details'})
        }
        // if user exists: 
        const existingUser = await User.findOne({ email })
        
        if (existingUser) 
            return res.json({ success: false, message: 'User already exists.' })
        // bcrypt encrypting password
        const hashedPassword = await bcrypt.hash(password, 10);
        // creates new user with a hashed password
        const user = await User.create({name, email, password: hashedPassword})
        // when the user is created, this creates a unique id for them. Uses a secret from the .env file and has an expiration date of 7 days out
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true, //Prevents JS from accessing cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7*24*60*60*1000, //Cookie expiration time (7days in miliseconds)
        });
    } catch (error) {
        
    }
}