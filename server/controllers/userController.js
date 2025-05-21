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
        // when the user is created, this creates a unique id for them
        const token = JWT.sign({id: user._id}, )
    } catch (error) {
        
    }
}