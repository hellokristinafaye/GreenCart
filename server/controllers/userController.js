import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
// import authUser from "../middlewares/authUser.js";

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
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true, //Prevents JS from accessing cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, //Cookie expiration time (7days in miliseconds)
        })
        // what happens when it creates a new user. Asigns new email and name based on input
        return res.json({ success: true, user: {email: user.email, name: user.name} })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Login User : /api/user/login
export const login = async(req, res)=> {
    try {
    // receives email and password from request body object
        const { email, password } = req.body;

        if (!email || !password) {
            return res.json({ success: false, message: 'Email and password are required.' })
        };
    // receives user from request body object
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: 'Invalid email or password.' });
        }
    // checks if passwords are the same
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid email or password.' });
        }
        // generate a token

        // when the user is created, this creates a unique id for them. Uses a secret from the .env file and has an expiration date of 7 days out
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true, //Prevents JS from accessing cookie
            secure: process.env.NODE_ENV === 'production', // use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, //Cookie expiration time (7days in miliseconds)
        })
        // what happens when it creates a new user. Asigns new email and name based on input
        return res.json({ success: true, user: { email: user.email, name: user.name, id: user._id } })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Check Auth : /api/user/is-auth
export const isAuth = async (req, res) => {
    try {
        const { userId } = req.body;
        // finds by Id and removes the password from the object
        const user = await User.findById(userId).select("-password");

        // const { id } = req.body;
        // const user = await User.findById(id).select("-password");

        return res.json({ success: true, user });

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Logout User : /api/user/logout
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });
        return res.json({success:true, message: "Logged Out" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}