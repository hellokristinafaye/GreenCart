import User from "../models/user.js";


// Register User : /api/user/register
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({success: false, message: 'Missing Details'})
        }
        // if user exists: 
        const existingUser = await User.findOne({ email })
        
        if (existingUser) {
            return res.json({ success: false, message: 'User already exists.' })
        }
    } catch (error) {
        
    }
}